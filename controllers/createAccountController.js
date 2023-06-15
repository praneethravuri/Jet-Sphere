const asyncHandler = require("express-async-handler");
const Credentials = require("../models/credentialsModel");
const bcrypt = require("bcrypt");

//@desc create an account
//@route POST /create-account
//@access Public
// API URL - http://localhost:5000/create-account

const userCreateAccount = asyncHandler(async (req, res) => {
  const { email, password, name } = req.body;

  console.log(email);
  console.log(password);

  if (!email || !password || !name) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const emailAvailable = await Credentials.findOne({ email });

  if (emailAvailable) {
    res.status(400);
    throw new Error("This email address is already in use");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(`Hashed password : ${hashedPassword}`);

  const createUser = await Credentials.create({
    email,
    password: hashedPassword,
    name
  });

  if (createUser) {
    res.render("homepage", { email : email, password : password, name: name })
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }

  res.status(200).json({ message: "Success" });
});

module.exports = { userCreateAccount };
