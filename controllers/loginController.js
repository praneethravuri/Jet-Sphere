const asyncHandler = require("express-async-handler");
const Credentials = require("../models/credentialsModel");
const bcrypt = require("bcrypt");

//@desc login to homepage
//@route POST /login
//@access Public
// API URL - http://localhost:5000/login

const userLogin = asyncHandler(async (req, res) => {
  const { email, password} = req.body;

  const credentials = await Credentials.findOne({ email });

  if (!credentials) {
    // Invalid email or password
    res.render("index", { errorMessage: "Invalid email or password", successMessage: "" });
  } else {
    const isPasswordMatch = await bcrypt.compare(password, credentials.password);

    if (isPasswordMatch) {
      // Login successful

      res.render("homepage", { email : email, password : password, name: credentials.name });
    } else {
      // Invalid email or password
      res.render("index", { errorMessage: "Invalid email or password", successMessage: "" });
    }
  }
});

module.exports = { userLogin };
