const utilities = require("../utilities/");
const baseController = {};


baseController.buildHome = async function (req, res) {
  const upgrades = [
  {
    name: "fluxcapacitor",
    url: "./images/upgrades/flux-cap.png",
  },
  {
    name: "flame Decals",
    url: "./images/upgrades/flame.png",
  },
  {
    name: "bumper stickers",
    url: "./images/upgrades/bumper_sticker.jpg",
  },
  {
    name: "Hub caps",
    url: "./images/upgrades/hub-cap.png",
  },
];
  const nav = await utilities.getNav();
  res.render("index", { title: "Home", nav, upgrades });
};
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


module.exports = { baseController };
