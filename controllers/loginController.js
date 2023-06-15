const asyncHandler = require("express-async-handler");
const Credentials = require("../models/credentialsModel");
const bcrypt = require("bcrypt");

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
      res.status(200).json({message : "Login successful"});
    } else {
      // Invalid password
      res.status(400);
      throw new Error("Invalid password")
    }
  }
});

module.exports = { userLogin };
