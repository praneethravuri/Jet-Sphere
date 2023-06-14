const asyncHandler = require("express-async-handler");
const Credentials = require("../models/credentialsModel");
const brcypt = require("bcrypt");

//@desc create an account
//@route POST /create-account
//@access Public

const userCreateAccount = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  console.log(email);
  console.log(password);

  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const emailAvailable = await Credentials.findOne({ email });

  if (emailAvailable) {
    res.status(400);
    throw new Error("This email address is already in use");
  }

  const hashedPassword = await brcypt.hash(password, 10);
  console.log(`Hashed password : ${hashedPassword}`);

  const createUser = await Credentials.create({
    email,
    password: hashedPassword,
  });

  if (createUser) {
    res.status(201).json({ _id: createUser.id, email: createUser.email });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }

  res.status(200).json({ message: "Success" });
});

module.exports = { userCreateAccount };
