const express = require("express");
const router = express.Router();

const { userLogin } = require("../controllers/loginController");

router
  .route("/")
  .get((req, res) => {
    // Render the index.ejs template with initial messages as empty
    res.render("index", { errorMessage: "", successMessage: "" });
  })
  .post(userLogin);

module.exports = router;
