const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/dbConnection");

connectDB();

const app = express();

const port = process.env.PORT || 8000;

app.use(express.json());
app.use(errorHandler);

// routes
app.use("/login", require("./routes/loginRoute"));
app.use("/create-account", require("./routes/createAccountRoute"));

// Redirect root URL to /login
app.get("/", (req, res) => {
  res.redirect("/login");
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
