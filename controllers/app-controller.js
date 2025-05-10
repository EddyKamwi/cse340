const index = (req, res) => {
  res.render("index", { title: "Home", page: "home" });
};
const custom = (req, res) => {
  res.render("index", { title: "Custom", page: "custom" });
};
const suv = (req, res) => {
  res.render("index", { title: "SUV", page: "suv" });
};
const sedan = (req, res) => {
  res.render("index", { title: "Sedan", page: "sedan" });
};
const truck = (req, res) => {
  res.render("index", { title: "Truck", page: "truck" });
};
module.exports = { index, custom, suv, sedan, truck };
