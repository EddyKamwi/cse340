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
Util.getUpgrades = [
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

Util.getClassName = async function (classification_id) {
  if (!classification_id || classification_id === "undefined") {
    return "Unknown Classification";
  }
  try {
    const data = await invModel.getClassificationById(classification_id);
    if (data.rows.length === 0) {
      return "Unknown Classification";
    }
    return data.rows[0].classification_name;
  } catch (error) {
    error.status = 500;
    throw error; // Propagate the error to be handled by the middleware
  }
}

Util.buildClassificationList = async function (classification_id = null) {
    let data = await invModel.getClassifications()
    let classificationList =
      '<select name="classification_id" id="classificationList" required class="select"> '
    classificationList += "<option selected disabled>Choose a Classification</option>"
    data.rows.forEach((row) => {
      classificationList += '<option value="' + row.classification_id + '"'
      if (
        classification_id != null &&
        row.classification_id == classification_id
      ) {
        classificationList += " selected "
      }
      classificationList += ">" + row.classification_name + "</option>"
    })
    classificationList += "</select>"
    return classificationList
  }

/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for
 * General Error Handling
 **************************************** */
Util.handleErrors = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

module.exports = Util;
