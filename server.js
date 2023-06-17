const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/dbConnection");
const session = require("express-session");
const store = new session.MemoryStore();

// connect to the mongoDB
connectDB();

const app = express();

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: true,
        store,
        cookie: {
            maxAge: 60 * 60 * 1000, // Set cookie expiration time to one hour (60 minutes)
        },
    })
);

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

// when the localhost is entered in the browser, automatically redirect to /login
app.get("/", (req, res) => {
    res.redirect("/login");
});

// add and search flights route
app.use("/", require("./routes/flightsRoute"));

// listen to port
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
