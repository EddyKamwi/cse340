const express = require("express");
const regValidation = require("../utilities/account-validation");
const utilities = require("../utilities/");
const router = express.Router();
const accountController = require("../controllers/account-controller");

router.get(
  "/register",
  utilities.handleErrors(accountController.buildRegister)
);
router.get(
  "/",
  utilities.handleErrors(accountController.getAccount)
);
router.post(
  "/register",
  regValidation.registrationRules(),
  regValidation.checkRegistrationData,
  utilities.handleErrors(accountController.registerAccount)
);

module.exports = router;
