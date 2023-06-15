const express = require("express");
const router = express.Router();

const { homepage } = require("../controllers/homepageController");

router.route("/").get((req, res) => {
  // Render the index.ejs template with initial messages as empty
  res.status(200).json({ message: "Reached homepage" });
});

module.exports = router;
