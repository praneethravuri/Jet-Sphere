const express = require("express");
const router = express.Router();

const {
    addFlights,
    searchFlights,
} = require("../controllers/flightsController");

router.post("/add-flights", addFlights);
router.post("/search-flights", searchFlights);

module.exports = router;
