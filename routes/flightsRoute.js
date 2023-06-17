const express = require("express");
const router = express.Router();

const {
    addFlights,
    searchFlights,
} = require("../controllers/flightsController");

router.post("/add-flights", addFlights);
router.route("/search-flights").post(searchFlights);

module.exports = router;
