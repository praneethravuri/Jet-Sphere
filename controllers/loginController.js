const asyncHandler = require("express-async-handler");
const Credentials = require("../models/credentialsModel");
const bcrypt = require("bcrypt");

const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  console.log(email);
  console.log(password);

  const credentials = await Credentials.findOne({ email });

  if (!credentials) {
    // Invalid email or password
    res.render("index", { errorMessage: "Invalid email or password", successMessage: "" });
  } else {
    const isPasswordMatch = await bcrypt.compare(password, credentials.password);

    if (isPasswordMatch) {
      // Login successful
      console.log("login success");
      res.render("homepage", { email : email, password : password });
    } else {
      // Invalid email or password
      res.render("index", { errorMessage: "Invalid email or password", successMessage: "" });
    }
  }
});

module.exports = { userLogin };
