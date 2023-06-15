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
