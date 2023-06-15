const express = require("express");
const router = express.Router();

// import the userCreateAccount from the controller
const { userCreateAccount } = require("../controllers/createAccountController");

router.route("/").post(userCreateAccount);

module.exports = router;
