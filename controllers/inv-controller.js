const utilities = require('../utilities/index');
const invController = {};

invController.buildInventory = async function (req, res, next) {
  const nav = await utilities.getNav();
  const inventories = await utilities.getInventoriesByClassificationId(req, res, next);
  if (!inventories) {
    return next(new Error("No inventories found for this classification"));
  }
  // res.json(inventories);
  res.render("inventory/classification", { title: "Inventory", nav, inventories });
};

module.exports = { invController };

