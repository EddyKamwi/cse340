const utilities = require(".");
const accountModel = require("../models/account-model");
const { body, validationResult } = require("express-validator");
const validate = {};

validate.registrationRules = () => {
  return [
    body("account_firstname")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("First name is required")
      .isLength({ min: 1 }),
    body("account_lastname")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage("Last name is required"),
    body("account_email")
      .trim()
      .escape()
      .notEmpty()
      .isEmail()
      .normalizeEmail()
      .withMessage("Valid email is required")
      .custom(async (account_email) => {
        const existingEmail = await accountModel.checkExistingEmail(
          account_email
        );
        if (existingEmail > 0) {
          throw new Error("Email already exists");
        }
      }),
    body("account_password")
      .trim()
      .notEmpty()
      .isStrongPassword({
        minLength: 12,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
      .withMessage("Password does not meet requirements"),
  ];
};

validate.loginRules = () => {
  return [
    body("account_email")
      .trim()
      .escape()
      .notEmpty()
      .isEmail()
      .normalizeEmail()
      .withMessage("Valid email is required"),
    body("account_password")
      .trim()
      .notEmpty()
      .withMessage("Password is required")
      .isStrongPassword({
        minLength: 12,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
      .withMessage("Password does not meet requirements"),
  ];
};

validate.updatePasswordRules = () => {
  return [
    body("account_password")
      .trim()
      .notEmpty()
      .isStrongPassword({
        minLength: 12,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
      .withMessage("Password does not meet requirements"),
  ];
};

validate.updateInfoRules = () => {
  return [
    body("account_firstname")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("First name is required")
      .isLength({ min: 1 }),
    body("account_lastname")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage("Last name is required"),
    body("account_email")
      .trim()
      .escape()
      .notEmpty()
      .isEmail()
      .normalizeEmail()
      .withMessage("Valid email is required"),
  ];
};

validate.checkUpdateInfoData = async (req, res, next) => {
  const { account_firstname, account_lastname, account_email } = req.body;
  let errors = [];
  errors = validationResult(req);
  if (!errors.isEmpty()) {
    const nav = await utilities.getNav();
    res.render("account/", {
      title: "Update Account Information",
      errors,
      nav,
      account_firstname,
      account_lastname,
      account_email,
    });
    return;
  }
  next();
};

validate.checkUpdatePasswordData = async (req, res, next) => {
  const { account_password } = req.body;
  let errors = [];
  errors = validationResult(req);
  if (!errors.isEmpty()) {
    const account_id = res.locals.accountData.account_id;
    const nav = await utilities.getNav();
    const { account_firstname, account_lastname, account_email } =
      await accountModel.getAccountById(account_id);
    res.render("account/index", {
      title: "Update Password",
      errors,
      nav,
      account_firstname,
      account_lastname,
      account_email,
      account_password,
    });
    return;
  }
  next();
};

validate.checkRegistrationData = async (req, res, next) => {
  const { account_firstname, account_lastname, account_email } = req.body;
  let errors = [];
  errors = validationResult(req);
  if (!errors.isEmpty()) {
    const nav = await utilities.getNav();
    res.render("account/register", {
      title: "Registration",
      errors,
      nav,
      account_firstname,
      account_lastname,
      account_email,
    });
    return;
  }
  next();
};

validate.checkLoginData = async (req, res, next) => {
  const { account_email } = req.body;
  let errors = [];
  errors = validationResult(req);
  if (!errors.isEmpty()) {
    const nav = await utilities.getNav();
    res.render("account/login", {
      title: "Login",
      errors,
      nav,
      account_email,
    });
    return;
  }
  next();
};
module.exports = validate;
