const asyncHandler = require("express-async-handler");
const Login = require("../models/credentialsModel");

//@desc get the login and password from the json body
//@route POST /login
//@access Public

const userLogin = asyncHandler(async (req, res) => {
    res.status(200).json(req.body);
});

module.exports = {userLogin};