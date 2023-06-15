const asyncHandler = require("express-async-handler");
const Flights = require("../models/flightsModel");

//@desc homepage
//@route POST /homepage
//@access Private
// API URL - http://localhost:5000/homepage

const homepage = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "reached homepage" });
});

module.exports = { homepage };
