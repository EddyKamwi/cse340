const {
  addClassification,
  addInventory,
} = require("../models/inventory-model");
const utilities = require("../utilities/index");
const invController = {};
const invModel = require("../models/inventory-model");

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

invController.managePage = async function (req, res) {
  const nav = await utilities.getNav();
  const classificationSelect = await utilities.buildClassificationList();
  res.render("inventory/management", {
    title: "Management Page",
    nav,
    errors: null,
    classificationSelect,
  });
};

invController.getInventoryJSON = async function (req, res, next) {
  const classification_id = req.params.id;
  console.log("classification_id:", classification_id);
  try {
    const inventories = await invModel.getInventoryByClassification(
      classification_id
    );
    if (inventories) {
      console.log(
        "fetching inventories for classification_id:",
        classification_id
      );
      return res.status(200).json(inventories.rows);
    } else {
      next(new Error("No data returned"));
    }
  } catch (err) {
    req.flash("notice", "Error retrieving inventory: " + err.message);
    next(new Error("Error retrieving inventory"));
  }
};

invController.buildEditPage = async function (req, res, next) {
  try {
    const nav = await utilities.getNav();
    const inventory = await invModel.getInventoryById(req.params.id);
    const data = inventory.rows[0];

    if (data) {
      const classificationName = await utilities.getClassName(
        data.classification_id
      );
      const classList = await utilities.buildClassificationList(
        data.classification_id,
        classificationName
      );
      res.render("inventory/edit", {
        title: "Edit Inventory Item",
        nav,
        inv_id: data.inv_id,
        inv_make: data.inv_make,
        inv_model: data.inv_model,
        inv_year: data.inv_year,
        inv_description: data.inv_description,
        inv_image: data.inv_image,
        inv_thumbnail: data.inv_thumbnail,
        inv_price: data.inv_price,
        inv_miles: data.inv_miles,
        inv_color: data.inv_color,
        classification_id: data.classification_id,
        classification_name: classificationName,
        classList,
        errors: null,
      });
    } else {
      req.flash("notice", "No inventory item found for editing.");
      res.redirect("/inv");
    }
  } catch (error) {
    req.flash("notice", "Error retrieving inventory for editing: ");
    next(error);
  }
};

invController.updateInv = async function (req, res, next) {
  const nav = await utilities.getNav();
  const {
    inv_id,
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
    await invModel.updateInventory(
      inv_id,
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
    req.flash("notice", "Inventory item updated successfully.");
    res.redirect("/inv");
  } catch (error) {
    req.flash("notice", "Error updating inventory: " + error.message);
    res.redirect(`/inv/edit/${inv_id}`);
  }
};

module.exports = { invController };
