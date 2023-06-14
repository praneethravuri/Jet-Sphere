const express = require("express");
const router = express.Router();

const { userLogin } = require("../controllers/loginController");

router.route("/")
  .get((req, res) => {
    // Render the index.ejs template
    res.render("index", { message: "This is the login page 123" });
  })
  .post(userLogin);

module.exports = router;
