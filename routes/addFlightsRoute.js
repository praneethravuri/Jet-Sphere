const express = require("express");
const router = express.Router();

const { addFlights } = require("../controllers/addFlightsController");
router.post("/", addFlights);

module.exports = router;
