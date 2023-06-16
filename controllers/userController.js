const asyncHandler = require("express-async-handler");
const Credentials = require("../models/credentialsModel");
const Bookings = require("../models/bookingsModel");
const bcrypt = require("bcrypt");
const fs = require("fs");

//@desc create an account
//@route POST /create-account
//@access Public
// API URL - http://localhost:5000/create-account

const userRegister = asyncHandler(async (req, res) => {
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

    await Bookings.create({
        email: email,
        bookings: [],
    });

    // if user is added to the database, give a success message
    if (user) {
        res.status(200).json({
            message: "Account registered successfully",
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

        await Bookings.create({
            email : cred.email,
            bookings: [],
        });
    }
    res.status(200).json({ message: "Added credentials successfully" }); */
});

//@desc login to homepage
//@route POST /login
//@access Public
// API URL - http://localhost:5000/login

const userLogin = asyncHandler(async (req, res) => {
    // request the email and password from the json file
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    // find if the user with the email provided is in the credentials database
    const user = await Credentials.findOne({ email });

    // if the user's email is not present in the database, throw an error
    if (!user) {
        res.status(400);
        throw new Error(`An account is not associated with ${email}`);
    }
    // if the user with the provided email is present in the credentials database,
    // check if the password provided matches with the password in the database
    // the password in the database is un-hashed and compared
    else {
        // comparing the hashed password with the provided password
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (isPasswordMatch) {
            // Login successful
            res.status(200).json({
                message: "Login successful",
                name: user.name,
            });
        } else {
            // Invalid password
            res.status(400);
            throw new Error("Invalid password");
        }
    }
});

//@desc update account details
//@route PATCH /update-account
//@access Private
// API URL - http://localhost:5000/update-account

const userUpdate = asyncHandler(async (req, res) => {
    const { name, password, email } = req.body;

    if (name) {
        // Find the user by email
        const user = await Credentials.findOne({ email });

        if (!user) {
            res.status(400);
            throw new Error(
                `Unable to find email ${email} associated with ${name}`
            );
        }

        // Update the user's name
        user.name = name;
        await user.save();

        res.status(200).json({ message: "Name updated successfully" });
    }

    if (password) {
        // Find the user by email
        const user = await Credentials.findOne({ email });

        if (!user) {
            res.status(400);
            throw new Error(`Unable to find email ${email}`);
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update the user's password
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: "Password updated successfully" });
    }

    // If neither name nor password is provided in the request body
    if (!name && !password) {
        res.status(400);
        throw new Error("Please provide a name or password to update");
    }
});

//@desc update account details
//@route PATCH /update-account
//@access Private
// API URL - http://localhost:5000/update-account

module.exports = { userRegister, userLogin, userUpdate };