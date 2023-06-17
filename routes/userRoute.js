const express = require("express");
const Credentials = require("../models/credentialsModel");

const router = express.Router();

const {
    userLogin,
    userRegister,
    userUpdate,
    userDelete,
    logout,
} = require("../controllers/userController");

router.route("/register").post(userRegister);
router
    .route("/login")
    .get((req, res) => {
        res.render("main");
    })
    .post(userLogin);
router.route("/update-account").patch(userUpdate);
router.route("/delete-account").delete(userDelete);
router.route("/logout").get(logout);

module.exports = router;
