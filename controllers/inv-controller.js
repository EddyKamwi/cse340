const utilities = require('../utilities/index');
const invController = {};

invController.buildInventory = async function (req, res, next) {
  const nav = await utilities.getNav();
  const name = utilities.getName(req.params.id);
  const inventories = await utilities.getInventoriesByClassificationId(req, res, next);
  if (!inventories) {
    return next(new Error("No inventories found for this classification"));
  }
  // res.json(inventories);
  res.render("inventory/classification", { title: "Inventory", nav, inventories, name });
};

invController.buildDetailPage = async function (req, res, next) {
  const nav = await utilities.getNav();
  const inventory = await utilities.getInventoryById(req, res, next);
  if (!inventory) {
    return next(new Error("No inventories found for this classification"));
  }
  res.render("inventory/detail", { title: "Inventory", nav, inventory });
};

module.exports = { invController };

