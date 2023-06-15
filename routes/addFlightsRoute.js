const express = require("express");
const router = express.Router();

// import the addflights from the controller
const { addFlights } = require("../controllers/addFlightsController");
router.post("/", addFlights);

module.exports = router;
