const {
  addClassification,
  addInventory,
} = require("../models/inventory-model");
const utilities = require("../utilities/index");
const invController = {};

invController.buildInventory = async function (req, res, next) {
  const nav = await utilities.getNav();
  const name = await utilities.getClassName(req.params.id);
  const inventories = await utilities.getInventoriesByClassificationId(
    req,
    res,
    next
  );
  if (!inventories) {
    return next(new Error("No inventories found for this classification"));
  }
  // res.json(inventories);
  res.render("inventory/classification", {
    title: "Inventory",
    nav,
    inventories,
    name,
  });
};

invController.buildDetailPage = async function (req, res, next) {
  const nav = await utilities.getNav();
  const inventory = await utilities.getInventoryById(req, res, next);
  if (!inventory) {
    return next(new Error("No inventories found for this classification"));
  }
  res.render("inventory/detail", {
    title: inventory.inv_make + " " + inventory.inv_model,
    nav,
    inventory,
  });
};

// add addClassification
invController.createClass = async function (req, res, next) {
  const nav = await utilities.getNav();
  const { classification_name } = req.body;
  try {
    addResult = await addClassification(classification_name);
    req.flash("notice", "Classification added successfully.");
    res.redirect("/inv");
  } catch (error) {
    req.flash("notice", "Error adding classification: " + error.message);
    res.render("inventory/add-classification", {
      title: "Add Classification",
      nav,
      errors: null,
    });
  }
};

invController.createInv = async function (req, res, next) {
  const nav = await utilities.getNav();
  const {
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color,
    classification_id,
  } = req.body;

  try {
    await addInventory(
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color,
      classification_id
    );
    req.flash("notice", "Inventory item added successfully.");
    res.redirect("/inv");
  } catch (error) {
    req.flash("notice", "Error adding inventory: " + error.message);
    res.redirect("/inv/new-inv");
  }
};

module.exports = { invController };
