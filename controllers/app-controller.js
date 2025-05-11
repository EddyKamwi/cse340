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

const index = (req, res) => {
  res.render("index", { title: "Home", page: "home", upgrades });
};
const custom = (req, res) => {
  res.render("custom", { title: "Custom", page: "custom" });
};
const suv = (req, res) => {
  res.render("suv", { title: "SUV", page: "suv" });
};
const sedan = (req, res) => {
  res.render("sedan", { title: "Sedan", page: "sedan" });
};
const truck = (req, res) => {
  res.render("truck", { title: "Truck", page: "truck" });
};
module.exports = { index, custom, suv, sedan, truck };
