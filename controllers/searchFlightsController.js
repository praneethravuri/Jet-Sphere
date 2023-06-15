const asyncHandler = require("express-async-handler");
const Flights = require("../models/flightsModel");

//@desc search for flights depending on location
//@route POST /search-flights
//@access Public
// API URL - http://localhost:5000/search-flights

const searchFlights = asyncHandler(async (req, res) => {
  // request the sourceIATA and destinationIATA codes from the json body
  const { sourceIATA, destinationIATA } = req.body;

  // throw an error if any of the fields are empty
  if (!sourceIATA || !destinationIATA) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  // find flights with the requested sourceIATA and destinationIATA codes
  const flight = await Flights.find({
    sourceIATA,
    destinationIATA,
  });

  // if an associated flight is not found, throw an error
  if (!flight) {
    res.status(400);
    throw new Error("No flight available");
  }

  // if a flight is found, return the flight details
  res
    .status(200)
    .json({ message: "Found flight details successfully", flight: flight });
});

module.exports = { searchFlights };
