const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/dbConnection");

// connect to the mongoDB
connectDB();

const app = express();

// Set EJS as the view engine
app.set("view engine", "ejs");

const port = process.env.PORT || 8000;

// parse json
app.use(express.json());
// parse the request body
app.use(express.urlencoded({ extended: true }));
// use the express async handler
app.use(errorHandler);

// routes
// login, register, update route
app.use("/", require("./routes/userRoute"));
//add and search flights route
app.use("/", require("./routes/flightsRoute"));
// homepage route
app.use("/homepage", require("./routes/homepageRoute"));

// when the localhost is entered in the browser, automatically redirect to /login
app.get("/", (req, res) => {
    res.redirect("/login");
});

// listen to port
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
