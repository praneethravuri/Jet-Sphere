const mongoose = require("mongoose");

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
    source: {
      type: String,
      required: [true, "Please enter the source"],
    },
    sourceIATA: {
      type: String,
      required: [true, "Please enter the source iata"],
    },
    destination: {
      type: String,
      required: [true, "Please enter the destination"],
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
