const asyncHandler = require("express-async-handler");
const Flights = require("../models/flightsModel");
const fs = require("fs");

//@desc add flight details
//@route POST /add-flights
//@access Private
// API URL - http://localhost:5000/add-flights

const addFlights = asyncHandler(async (req, res) => {
  const flightsData = fs.readFileSync(
    __dirname + "/../data/flightDetails.json"
  );

  const flights = JSON.parse(flightsData);

  //console.log(flights);

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
      console.log(`Flight: ${flightId} has been added to the database`);
    } else {
      console.log(`Flight: ${flightId} is already present in the database`);
    }
  }

  res.status(200).json({ message: "Added flights successfully" });
});

module.exports = {
  addFlights,
};
