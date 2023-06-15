const asyncHandler = require("express-async-handler");
const Credentials = require("../models/credentialsModel");
const bcrypt = require("bcrypt");
const fs = require("fs");

//@desc create an account
//@route POST /create-account
//@access Public
// API URL - http://localhost:5000/create-account

const userCreateAccount = asyncHandler(async (req, res) => {
    // get the email, password, name from the json object
    const { email, password, name } = req.body;

    // if any of the fields are empty, return an error
    if (!email || !password || !name) {
        res.status(404);
        throw new Error("All fields are mandatory");
    }

    // find if the provided email is present in the database
    const duplicateEmail = await Credentials.findOne({ email });

    // if the email is already present in the database, throw an error
    if (duplicateEmail) {
        res.status(400);
        throw new Error("This email address is already in use");
    }

    // hash the password with 10 rounds using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // add the provided name, email, password to the credentials collection
    const user = await Credentials.create({
        email,
        password: hashedPassword,
        name,
    });

    // if user is added to the database, give a success message
    if (user) {
        res.status(200).json({
            message: "Added information to credentials successfully",
        });
    }
    // if an error occurs while added the user to the database, throw an error
    else {
        res.status(400);
        throw new Error("User data is not valid");
    }

    /*     let creds = fs.readFileSync(__dirname + "/../data/credentials.json");
    creds = JSON.parse(creds);

    for (let cred of creds) {
        const hashedPassword = await bcrypt.hash(cred.password, 10);
        await Credentials.create({
            email: cred.email,
            password: hashedPassword,
            name: cred.name,
        });
    }
    res.status(200).json({ message: "Added credentials successfully" }); */
});

module.exports = { userCreateAccount };
