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
  utilities.checkLogin,
  utilities.handleErrors(accountController.accountInfoPage)
);
router.post(
  "/register",
  regValidation.registrationRules(),
  regValidation.checkRegistrationData,
  utilities.handleErrors(accountController.registerAccount)
);

router.get("/login", utilities.handleErrors(accountController.buildLogin));

router.post(
  "/login",
  regValidation.loginRules(),
  regValidation.checkLoginData,
  utilities.handleErrors(accountController.accountLogin)
);
router.get(
  "/logout",
  utilities.checkLogin,
  utilities.handleErrors(accountController.logoutAccount)
);

router.post(
  "/update",
  utilities.checkLogin,
  regValidation.updateInfoRules(),
  regValidation.checkUpdateInfoData,
  utilities.handleErrors(accountController.updateAccount)
);
router.post(
  "/update-password",
  utilities.checkLogin,
  regValidation.updatePasswordRules(),
  regValidation.checkUpdatePasswordData,
  utilities.handleErrors(accountController.updatePassword)
);

module.exports = router;
