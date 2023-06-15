const express = require("express");
const router = express.Router();

const { searchFlights } = require("../controllers/searchFlightsController");

router.route("/").post(searchFlights);

module.exports = router;
