const accountController = {};
const utilities = require("../utilities/");

accountController.getAccount = async (req, res) => {
  const nav = await utilities.getNav();
  res.render("account/index", { title: "Dashboard", nav });
};

accountController.buildLogin = async (req, res) => {
  const nav = await utilities.getNav();
  res.render("account/login", { title: "Login", nav });
};

accountController.buildRegister = async (req, res) => {
  const nav = await utilities.getNav();
  res.render("account/register", {
    title: "Register",
    nav,
    errors: null,
  });
};

module.exports = accountController;
