const asyncHandler = require("express-async-handler");
const Flights = require("../models/flightsModel");
const Bookings = require("../models/bookingsModel");

//@desc homepage
//@route POST /homepage
//@access Private
// API URL - http://localhost:5000/homepage

// send a message when homepage is reached
const diplayBookings = asyncHandler(async (req, res) => {
  const currentUserEmail = req.session.email;
  console.log(currentUserEmail);
  res.status(200).json({ message: "reached homepage" });
});



module.exports = { diplayBookings };
