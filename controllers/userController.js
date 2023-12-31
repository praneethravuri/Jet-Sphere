const asyncHandler = require("express-async-handler");
const Credentials = require("../models/credentialsModel");
const bcrypt = require("bcrypt");
const fs = require("fs");
const session = require("express-session");

//@desc create an account
//@route POST /register
//@access Public
// API URL - http://localhost:5000/register

const userRegister = asyncHandler(async (req, res) => {
    try {
        // get the email, password, name from the json object
        const {
            email,
            password,
            firstName,
            lastName,
            title,
            phone,
            birthDate,
        } = req.body;

        // if any of the fields are empty, return an error
        if (
            !email ||
            !password ||
            !firstName ||
            !lastName ||
            !title ||
            !phone ||
            !birthDate
        ) {
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
            firstName,
            lastName,
            title,
            phone,
            birthDate,
        });

        // if user is added to the database, give a success message
        if (user) {
            req.session.email = user.email;
            console.log(req.session.email);
            res.status(200).json({
                message: `User with email: ${email} registered successfully`,
            });
        } else {
            res.status(400);
            throw new Error("User data is not valid");
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//@desc login to homepage
//@route POST /login
//@access Public
// API URL - http://localhost:5000/login

const userLogin = asyncHandler(async (req, res) => {
    try {
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
        } else {
            // comparing the hashed password with the provided password
            const isPasswordMatch = await bcrypt.compare(
                password,
                user.password
            );

            if (isPasswordMatch) {
                // Login successful
                req.session.email = user.email;
                //res.redirect("/homepage", {email : email});
                $("#message").html("<p>Login successful</p>");
            } else {
                // Invalid password
                res.status(400);
            }
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }

    

});

//@desc update account details
//@route PATCH /update-account
//@access Private
// API URL - http://localhost:5000/update-account

const userUpdate = asyncHandler(async (req, res) => {
    try {
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
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//@desc delete account
//@route DELETE /delete-account
//@access Private
// API URL - http://localhost:5000/delete-account

const userDelete = asyncHandler(async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            res.status(400);
            throw new Error("All fields are mandatory");
        }

        const user = await Credentials.findOne({ email });

        if (!user) {
            res.status(400);
            throw new Error(`${email} is not present in the database`);
        }

        await Credentials.deleteOne({ email });

        res.status(200).json({
            message: `${email} has been deleted from the database`,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//@desc logout
//@route GET /logout
//@access Private

const logout = asyncHandler(async (req, res) => {
    try {
        req.session.destroy();
        res.redirect("/");
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = { userRegister, userLogin, userUpdate, userDelete, logout };
