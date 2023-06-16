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
            sourceCity,
            sourceCountry,
            sourceIATA,
            destinationCity,
            destinationCountry,
            destinationIATA,
            duration,
        } = flight;

        if (flightIdArray.includes(flightId)) {
            console.log(`Duplicate flight: ${flightId}`);
            continue;
        }

        flightIdArray.push(flightId);

        // find the flight details using the flightId
        const existingFlight = await Flights.findOne({ flightId });

        if (!existingFlight) {
            await Flights.create({
                flightId,
                sourceCity,
                sourceCountry,
                sourceIATA: sourceIATA.toUpperCase(),
                destinationCity,
                destinationCountry,
                destinationIATA: destinationIATA.toUpperCase(),
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
    // request the sourceIATA and destinationIATA codes from the JSON body
    const { sourceIATA, destinationIATA, returnTicket } = req.body;

    // throw an error if any of the fields are empty
    if (!sourceIATA || !destinationIATA || !returnTicket) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    // find flights with the requested sourceIATA and destinationIATA codes
    const flight = await Flights.find({
        sourceIATA,
        destinationIATA,
    });

    if (flight) {
        if (returnTicket === "yes") {
            const returnFlight = await Flights.find({
                sourceIATA: destinationIATA,
                destinationIATA: sourceIATA,
            });

            res.status(200).json({
                flight: flight,
                returnFlight: returnFlight,
            });
        } else if (returnTicket === "no") {
            res.status(200).json({
                flight: flight,
            });
        }
    } else {
        res.status(400);
        throw new Error("No flight available");
    }
});

module.exports = {
    addFlights,
    searchFlights,
};
