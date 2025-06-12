const utilities = require("../utilities/");
const baseController = {};

baseController.buildHome = async function (req, res) {
 const upgrades = utilities.getUpgrades;
  const nav = await utilities.getNav();
  res.render("index", { title: "Home", nav, upgrades });
};
baseController.managePage = async function (req, res) {
  const nav = await utilities.getNav();
  res.render("inventory/management", { title: "Management Page", nav });
}

baseController.newClass = async function (req, res) {
  const nav = await utilities.getNav();
  res.render("inventory/add-classification", { title: "Create a Classification", nav,errors: null });
}

baseController.newInv = async function (req, res) {
  const nav = await utilities.getNav();
  const classList = await utilities.buildClassificationList();
  res.render("inventory/add-inventory", { title: "Add an Inventory", nav ,errors: null ,classList});
}

/* *******************************************
 * buildError pages
 * This function builds the error page
 *******************************************/
baseController.buildError = async function (req, res, next) {
  const nav = await utilities.getNav();
  const err = new Error("Page Not Found");
  err.status = 404;
  res.status(err.status || 500);
  res.render("errors/error", {
    title: err.status || 500,
    nav,
    message: err.message,
    error: err,
  });
};

baseController.buildError500 = async (req, res, next) => {
  new Error("Server Error");
  res.status(500);
  res.render("errors/error", {
    title: "500",
    nav: await utilities.getNav(),
    message: "Something went wrong, please try again later.",
    error: new Error("Server Error"),
  });
};

module.exports = { baseController };
