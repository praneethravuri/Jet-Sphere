const express = require("express");
const router = express.Router();

const {userCreateAccount} = require("../controllers/createAccountController");

router.route("/").post(userCreateAccount);

module.exports = router;