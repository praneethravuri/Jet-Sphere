const express = require("express");
const Credentials = require("../models/credentialsModel");

const router = express.Router();

const { userLogin, userRegister } = require("../controllers/userController");

router.route("/register").post(userRegister);
router.route("/login").post(userLogin);

module.exports = router;
