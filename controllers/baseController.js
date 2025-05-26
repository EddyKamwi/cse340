const utilities = require("../utilities/");
const baseController = {};
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

baseController.buildHome = async function (req, res) {
  const nav = await utilities.getNav();
  res.render("index", { title: "Home", nav, upgrades });
};

module.exports = { baseController };
