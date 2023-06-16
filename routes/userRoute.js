const express = require("express");
const Credentials = require("../models/credentialsModel");

const router = express.Router();

const {
    userLogin,
    userRegister,
    userUpdate,
    userDelete,
} = require("../controllers/userController");

router.route("/register").post(userRegister);
router.route("/login").post(userLogin);
router.route("/update-account").patch(userUpdate);
router.route("/delete-account").delete(userDelete);

module.exports = router;
