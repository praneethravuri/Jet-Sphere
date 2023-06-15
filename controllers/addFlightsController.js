const asyncHandler = require("express-async-handler");
const Flights = require("../models/flightsModel");

//@desc add flight details
//@route POST /add-flights
//@access Private
// API URL - http://localhost:5000/add-flights

const addFlights = asyncHandler(async (req, res) => {
  const {
    flightId,
    airlineName,
    source,
    sourceIATA,
    destination,
    destinationIATA,
    departureTime,
    arrivalTime,
    duration,
  } = req.body;

  if (
    !flightId ||
    !airlineName ||
    !source ||
    !sourceIATA ||
    !destination ||
    !destinationIATA ||
    !departureTime ||
    !arrivalTime ||
    !duration
  ) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const searchFlight = await Flights.findOne({ flightId });

  if (searchFlight) {
    res.status(400);
    throw new Error("This flight is already present in the database");
  }

  const createFlight = await Flights.create({
    flightId,
    airlineName,
    source,
    sourceIATA,
    destination,
    destinationIATA,
    departureTime,
    arrivalTime,
    duration,
  });

  if (createFlight) {
    res.status(200).json({ message: "Added flight successfully" });
  } else {
    res.status(400);
    throw new Error("Unable to add the flight");
  }
});

module.exports = {
  addFlights,
};
