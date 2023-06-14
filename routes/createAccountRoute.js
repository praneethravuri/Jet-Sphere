const express = require("express");
const router = express.Router();

const { userCreateAccount } = require("../controllers/createAccountController");

router
  .route("/")
  .get((req, res) => {
    res.render("createAccount");
  })
  .post(userCreateAccount);

module.exports = router;
