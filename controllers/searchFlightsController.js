const asyncHandler = require("express-async-handler");
const Flights = require("../models/flightsModel");

//@desc search for flights depending on location
//@route POST /search-flights
//@access Public
// API URL - http://localhost:5000/search-flights

const searchFlights = asyncHandler(async (req, res) => {
  const { sourceIATA, destinationIATA } = req.body;

  if (!sourceIATA || !destinationIATA) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const flight = await Flights.find({
    sourceIATA,
    destinationIATA,
  });

  if (!flight) {
    res.status(400);
    throw new Error("No flight available");
  }

  res.status(200).json({ message: "Found", flight: flight });
});

module.exports = { searchFlights };
