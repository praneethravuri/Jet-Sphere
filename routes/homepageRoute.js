const express = require("express");
const { displayBookings } = require("../controllers/homepageController");
const router = express.Router();

router.post("/homepage", displayBookings);

module.exports = router;
