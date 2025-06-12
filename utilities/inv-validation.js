const utilities = require(".");
const invModel = require("../models/inventory-model");
const { body, validationResult } = require("express-validator");
const validate = {};

validate.inventoryRules = () => {
  return [
    body("inv_make")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Make is required")
      .isLength({ min: 1 }),
    body("inv_model")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Model is required")
      .isLength({ min: 1 }),
    body("inv_year")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Year is required")
      .isNumeric(),
    body("inv_description")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Description is required")
      .isLength({ min: 10 })
      .withMessage("Description must be at least 10 characters long"),
    body("inv_image")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Image is required")
      .isURL()
      .withMessage("Image must be a valid URL"),
    body("inv_thumbnail")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Thumbnail is required")
      .isURL()
      .withMessage("Thumbnail must be a valid URL"),
    body("inv_price")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Price is required")
      .isNumeric()
      .withMessage("Price must be a numeric value"),
    body("inv_miles")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Miles is required")
      .isNumeric()
      .withMessage("Miles must be a numeric value"),
    body("inv_color")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Color is required")
      .isLength({ min: 3 })
      .withMessage("Color must be at least 3 characters long"),
    body("classification_id")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Classification is required")
      .isNumeric()
      .withMessage("Classification must be a numeric value"),
  ];
};

validate.checkInventoryData = async (req, res, next) => {
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
  let errors = [];
  errors = validationResult(req);
  if (!errors.isEmpty()) {
    const nav = await utilities.getNav();
    const classList = await utilities.buildClassificationList();
    res.render("inventory/add-inventory", {
      title: "Add Inventory",
      errors,
      classList,
      nav,
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
    });
  } else {
    next();
  }
};

module.exports = { validate };
