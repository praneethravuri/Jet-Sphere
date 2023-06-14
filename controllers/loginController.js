const asyncHandler = require("express-async-handler");
const Credentials = require("../models/credentialsModel");
const bcrypt = require("bcrypt");

//@desc User login
//@route POST /login
//@access Public

const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const credentials = await Credentials.findOne({ email });

  if (!credentials) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  const isPasswordMatch = await bcrypt.compare(password, credentials.password);

  if (isPasswordMatch) {
    res.status(200).json({ message: `Login Successful ${credentials.password}` });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
});

module.exports = { userLogin };
