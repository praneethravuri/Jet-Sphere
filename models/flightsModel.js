const mongoose = require("mongoose");

// example document
/* 
{
  "_id": {
    "$oid": "648ad5ffcd7f4d0bcd61d565"
  },
  "flightId": "4Gh7S",
  "airlineName": "Emirates",
  "sourceCity": "Dubai",
  "sourceCountry": "United Arab Emirates",
  "sourceIATA": "DXB",
  "destinationCity": "London",
  "destinationCountry": "United Kingdom",
  "destinationIATA": "LHR",
  "departureTime": "2023-06-15 06:30 AM",
  "arrivalTime": "2023-06-15 10:45 AM",
  "duration": "7 hours 15 minutes",
  "createdAt": {
    "$date": "2023-06-15T09:12:31.699Z"
  },
  "updatedAt": {
    "$date": "2023-06-15T09:12:31.699Z"
  },
  "__v": 0
} 
*/

const flightsSchema = mongoose.Schema(
  {
    flightId: {
      type: String,
      required: [true, "Please add the flightId"],
    },
    airlineName: {
      type: String,
      required: [true, "Please add the airlineName"],
    },
    sourceCity: {
      type: String,
      required: [true, "Please enter the source city"],
    },
    sourceCountry: {
      type: String,
      required: [true, "Please enter the source country"],
    },
    sourceIATA: {
      type: String,
      required: [true, "Please enter the source iata"],
    },
    destinationCity: {
      type: String,
      required: [true, "Please enter the destination city"],
    },
    destinationCountry: {
      type: "String",
      required: [true, "Please enter the destination country"],
    },
    destinationIATA: {
      type: String,
      required: [true, "Please enter the destination iata"],
    },
    departureTime: {
      type: String,
      required: [true, "Please enter the departureTime"],
    },
    arrivalTime: {
      type: String,
      required: [true, "Please enter the arrivalTime"],
    },
    duration: {
      type: String,
      required: [true, "Please enter the duration"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Flights", flightsSchema);
