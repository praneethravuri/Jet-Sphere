const express = require("express");
const router = express.Router();

const { searchFlights } = require("../controllers/searchFlightsController");

router
  .route("/")
  .get((req, res) => {
    res.status(200);
  })
  .post(searchFlights);

module.exports = router;
