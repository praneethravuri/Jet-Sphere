const express = require("express");
const { diplayBookings } = require("../controllers/homepageController");
const router = express.Router();

router.post("/homepage", diplayBookings);

module.exports = router;
