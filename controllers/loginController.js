const asyncHandler = require("express-async-handler");

//@desc get the login and password from the json body
//@route GET /login
//@access Public

const userLogin = asyncHandler(async (req, res) => {
    res.status(200).json(req.body);
});

module.exports = {userLogin};