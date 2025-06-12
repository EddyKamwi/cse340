const utilities = require(".");
const invModel = require("../models/inventory-model");
const { body, validationResult } = require("express-validator");
const validate = {};

validate.classificationRules = () => {
  return [
    body("classification_name")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Classification name is required")
      .isLength({ min: 1 })
      .custom(async (classification_name) => {
        const existingClassification = await invModel.checkClassificationExists(
          classification_name
        );
        if (existingClassification > 0) {
          throw new Error("Classification already exists");
        }
      }),
  ];
};

validate.checkClassificationData = async (req, res, next) => {
  const { classification_name } = req.body;
  let errors = [];
  errors = validationResult(req);
  if (!errors.isEmpty()) {
    const nav = await utilities.getNav();
    res.render("inventory/add-classification", {
      title: "Add Classification",
      errors,
      nav,
      classification_name,
    });
  } else {
    next();
  }
};

module.exports = { validate };
