const asyncHandler = require("express-async-handler");
const Flights = require("../models/flightsModel");
const fs = require("fs");

//@desc add flight details
//@route POST /add-flights
//@access Private
// API URL - http://localhost:5000/add-flights

const addFlights = asyncHandler(async (req, res) => {
  // open the json file containing the flight details
  const flightsData = fs.readFileSync(
    __dirname + "/../data/flightDetails.json"
  );

  // parse the json data
  const flights = JSON.parse(flightsData);

  for (const flight of flights) {
    const {
      flightId,
      airlineName,
      sourceCity,
      sourceCountry,
      sourceIATA,
      destinationCity,
      destinationCountry,
      destinationIATA,
      departureTime,
      arrivalTime,
      duration,
    } = flight;

    // find the flight details using the flightId
    const searchFlight = await Flights.findOne({ flightId });

    if (!searchFlight) {
      await Flights.create({
        flightId,
        airlineName,
        sourceCity,
        sourceCountry,
        sourceIATA: sourceIATA.toUpperCase(),
        destinationCity,
        destinationCountry,
        destinationIATA: destinationIATA.toUpperCase(),
        departureTime,
        arrivalTime,
        duration,
      });
      res
        .status(200)
        .json({
          message: `Flight: ${flightId} has been added to the database`,
        });
    } else {
      res
        .status(400)
        .json({
          message: `Flight : ${flightId} is already present in the database`,
        });
    }
  }
});

module.exports = {
  addFlights,
};
