const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/dbConnection");

connectDB();

const app = express();

app.set("view engine", "ejs"); // Set EJS as the view engine

const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Add this line to parse the request body

app.use(errorHandler);

// routes
app.use("/login", require("./routes/loginRoute"));
app.use("/create-account", require("./routes/createAccountRoute"));
app.use("/add-flights", require("./routes/addFlightsRoute"));
app.use("/homepage", require("./routes/homepageRoute"));

app.get("/", (req, res) => {
  res.redirect("/login");
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
