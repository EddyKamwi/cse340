const express = require("express");
const passport = require("passport");
const router = express.Router();
const utilities = require("../utilities/index");
const { baseController } = require("../controllers/baseController");

router.get("/auth/github", passport.authenticate("github"));

router.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/account/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/account");
  }
);

//500 server error
router.get("/500", baseController.buildError500);
router.get("/", utilities.handleErrors(baseController.buildHome));

module.exports = router;
