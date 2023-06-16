const asyncHandler = require("express-async-handler");
const Flights = require("../models/flightsModel");
const fs = require("fs");

//@desc add flight details
//@route POST /add-flights
//@access Private
// API URL - http://localhost:5000/add-flights

const addFlights = asyncHandler(async (req, res) => {
    // open the JSON file containing the flight details
    const flightsData = fs.readFileSync(
        __dirname + "/../data/flightDetails.json"
    );

    // parse the JSON data
    const flights = JSON.parse(flightsData);

    const flightIdArray = [];

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

        if (flightIdArray.includes(flightId)) {
            console.log(`Duplicate flight : ${flightId}`);
        }

        flightIdArray.push(flightId);

        // find the flight details using the flightId
        const searchFlight = await Flights.findOne({ flightId });

        if (!searchFlight && !flightIdArray.includes(flightId)) {
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
            console.log(
                `Flight: ${flightId} is already present in the database`
            );
        }
    }
    console.log("Flights have been processed");
    res.status(200).json({ message: "Flights have been processed" });
});

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
    res.status(200).json({
        message: "Found flight details successfully",
        flight: flight,
    });
});

module.exports = {
    addFlights,
    searchFlights,
};