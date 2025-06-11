const invModel = require("../models/inventory-model");
const Util = {};

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications();
  let list = "<ul>";
  list += '<li><a href="/" title="Home page">Home</a></li>';
  data.rows.forEach((row) => {
    list += "<li>";
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>";
    list += "</li>";
  });
  list += "</ul>";
  return list;
};
Util.getInventoriesByClassificationId = async function (req, res, next) {
  const classificationId = req.params.id;
  if (!classificationId || classificationId === "undefined") {
    res.redirect("/");
    return; // Redirect if no classification ID is provided
  }
  try {
    const data = await invModel.getInventoryByClassification(classificationId);
    return data.rows;
  } catch (error) {
    error.status = 500;
    return next(error);
  }
};

Util.getInventoryById = async function (req, res, next) {
  const inventoryId = req.params.id;
  if (!inventoryId || inventoryId === "undefined") {
    res.redirect("/");
    return; // Redirect if no inventory ID is provided
  }
  try {
    const data = await invModel.getInventoryById(inventoryId);
    if (data.rows.length === 0) {
      const error = new Error("No inventory found for this ID");
      error.status = 404;
      return next(error);
    }
    return data.rows[0];
  } catch (error) {
    error.status = 500;
    return next(error);
  }
};

Util.handleErrors = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

Util.getName = (num) => {
  if (num === 1 || num === "1") {
    return "Custom";
  } else if (num === 2 || num === "2") {
    return "Sport";
  } else if (num === 3 || num === "3") {
    return "SUV";
  } else if (num === 4 || num === "4") {
    return "Truck";
  } else if (num === 5 || num === "5") {
    return "Sedan";
  } else {
    return "Unknown";
  }
};

/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for
 * General Error Handling
 **************************************** */
Util.handleErrors = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

module.exports = Util;
