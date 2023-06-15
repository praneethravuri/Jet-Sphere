const asyncHandler = require("express-async-handler");
const Credentials = require("../models/credentialsModel");
const bcrypt = require("bcrypt");

//@desc login to homepage
//@route POST /login
//@access Public
// API URL - http://localhost:5000/login

const userLogin = asyncHandler(async (req, res) => {
  const { email, password} = req.body;

  const user = await Credentials.findOne({ email });

  if (!user) {
    // Invalid email or password
    res.render("index", { errorMessage: "Invalid email or password", successMessage: "" });
  } else {
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (isPasswordMatch) {
      // Login successful

      res.redirect("/homepage");
    } else {
      // Invalid email or password
      res.render("index", { errorMessage: "Invalid email or password", successMessage: "" });
    }
  }
});

module.exports = { userLogin };
