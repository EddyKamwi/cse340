const accountController = {};
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const utilities = require("../utilities/");
const accountModel = require("../models/account-model");
const avatarModel = require("../models/avatar-model");
require("dotenv").config();

accountController.accountInfoPage = async (req, res) => {
  const nav = await utilities.getNav();
  const { account_id } = res.locals.accountData;
  const { account_firstname, account_lastname, account_email } =
    await accountModel.getAccountById(account_id);
  return res.render("account/index", {
    nav,
    title: "Account Info",
    account_id,
    account_firstname,
    account_lastname,
    account_email,
    errors: null,
  });
};

accountController.buildLogin = async (req, res) => {
  const nav = await utilities.getNav();
  res.render("account/login", { title: "Login", nav, errors: null });
};
/* ****************************************
 *  Process login request
 * ************************************ */
accountController.accountLogin = async (req, res) => {
  let nav = await utilities.getNav();
  const { account_email, account_password } = req.body;
  const accountData = await accountModel.getAccountByEmail(account_email);
  if (!accountData) {
    req.flash("notice", "Please check your credentials and try again.");
    res.status(400).render("account/login", {
      title: "Login",
      nav,
      errors: null,
      account_email,
    });
    return;
  }
  try {
    if (await bcrypt.compare(account_password, accountData.account_password)) {
      delete accountData.account_password;
      const accessToken = jwt.sign(
        accountData,
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: 3600 * 1000 }
      );
      if (process.env.NODE_ENV === "development") {
        res.cookie("jwt", accessToken, {
          httpOnly: true,
          maxAge: 3600 * 1000,
        });
      } else {
        res.cookie("jwt", accessToken, {
          httpOnly: true,
          secure: true,
          maxAge: 3600 * 1000,
        });
      }
      return res.redirect("/inv");
    } else {
      req.flash(
        "message notice",
        "Please check your credentials and try again."
      );
      res.status(400).render("account/login", {
        title: "Login",
        nav,
        errors: null,
        account_email,
      });
    }
  } catch (error) {
    throw new Error("Access Forbidden");
  }
};

accountController.buildRegister = async (req, res, next) => {
  const nav = await utilities.getNav();
  res.render("account/register", {
    title: "Register",
    nav,
    errors: null,
  });
  next();
};

/* ****************************************
 *  Process Registration
 * *************************************** */
accountController.registerAccount = async (req, res) => {
  let nav = await utilities.getNav();

  const {
    account_firstname,
    account_lastname,
    account_email,
    account_password,
  } = req.body;

  // Hash the password before storing
  let hashedPassword;
  try {
    // regular password and cost (salt is generated automatically)
    hashedPassword = await bcrypt.hashSync(account_password, 10);
  } catch (error) {
    req.flash(
      "notice",
      "Sorry, there was an error processing the registration."
    );
    res.status(500).render("account/register", {
      title: "Registration",
      nav,
      errors: null,
    });
  }

  const regResult = await accountModel.registerAccount(
    account_firstname,
    account_lastname,
    account_email,
    hashedPassword
  );

  if (regResult) {
    req.flash(
      "notice",
      `Congratulations, you\'re registered ${account_firstname}. Please log in.`
    );

    //insert avatar

    try {
      const account_id = regResult.rows[0].account_id;
      const avatar_path = req.body.avatar;
      await avatarModel.insertProfileImage(account_id, avatar_path);
      console.log("file inserted!");
    } catch (error) {
      console.log("failed to insert avatar");
    }

    res.status(201).render("account/login", {
      title: "Login",
      nav,
      errors: null,
    });
  } else {
    req.flash("notice", "Sorry, the registration failed.");
    res.status(501).render("account/register", {
      title: "Registration",
      nav,
    });
  }
};

accountController.logoutAccount = (req, res) => {
  res.clearCookie("jwt");
  req.flash("notice", "You have been logged out.");
  res.redirect("/account/login");
};

accountController.updateAccount = async (req, res) => {
  const { account_firstname, account_lastname, account_email, account_id } =
    req.body;
  try {
    // Update the account information
    const updateResult = await accountModel.updateAccountInfo(
      account_id,
      account_firstname,
      account_lastname,
      account_email
    );

    if (updateResult) {
      req.flash("notice", "Account information updated successfully.");
      return res.redirect(`/account`);
    } else {
      req.flash("notice", "Failed to update account. Please try again.");
      return res.status(500).redirect(`/account`);
    }
  } catch (error) {
    req.flash("notice", "An error occurred while updating the account.");
    return res.status(500).redirect(`/account`);
  }
};

accountController.updatePassword = async (req, res) => {
  const { account_id, account_password } = req.body;
  try {
    // Hash the new password
    const hashedPassword = await bcrypt.hashSync(account_password, 10);

    // Update the account password
    const updateResult = await accountModel.updateAccountPassword(
      account_id,
      hashedPassword
    );

    if (updateResult) {
      req.flash("notice", "Password updated successfully.");
      return res.redirect(`/account`);
    } else {
      req.flash("notice", "Failed to update password. Please try again.");
      return res.status(500).redirect(`/account`);
    }
  } catch (error) {
    req.flash("notice", "An error occurred while updating the password.");
    return res.status(500).redirect(`/account`);
  }
};
module.exports = accountController;
