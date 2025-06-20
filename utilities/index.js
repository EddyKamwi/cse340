const invModel = require("../models/inventory-model");
const avatarModel = require("../models/avatar-model");
const Util = {};
const jwt = require("jsonwebtoken");
require("dotenv").config();
const multer = require("multer");

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
};

Util.buildClassificationList = async function (
  classification_id = null,
  classification_name = null
) {
  let data = await invModel.getClassifications();
  let classificationList =
    '<select name="classification_id" id="classificationList" required class="select"> ';
  if (classification_name != null) {
    classificationList += `<option selected disabled value='${classification_id}'>${classification_name}</option>"`;
  } else {
    classificationList +=
      "<option selected disabled>Choose a Classification</option>";
  }
  data.rows.forEach((row) => {
    classificationList += '<option value="' + row.classification_id + '"';
    if (
      classification_id != null &&
      row.classification_id == classification_id
    ) {
      classificationList += " selected ";
    }
    classificationList += ">" + row.classification_name + "</option>";
  });
  classificationList += "</select>";
  return classificationList;
};

/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for
 * General Error Handling
 **************************************** */
Util.handleErrors = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

Util.checkJWTToken = (req, res, next) => {
  if (req.cookies.jwt) {
    jwt.verify(
      req.cookies.jwt,
      process.env.ACCESS_TOKEN_SECRET,
      async function (err, accountData) {
        if (err) {
          req.flash("Please Log in");
          res.clearCookie("jwt");
          return res.redirect("/account/login");
        }
        //collecting a row from the avatar table using a user id
        const image = await avatarModel.getAvatarByAccountId(accountData.account_id)
        res.locals.accountData = accountData;
        res.locals.loggedIn = true;

        //collecting the value from the column avatar_path
        res.locals.avatar = image.rows[0].avatar_path;
        next();
      }
    );
  } else {
    next();
  }
};

Util.checkLogin = (req, res, next) => {
  if (res.locals.loggedIn) {
    next();
  } else {
    req.flash("notice", "Please Log in");
    return res.redirect("/account/login");
  }
};

const options = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/avatars");
  },
  filename: async function (req, file, cb) {
    const fileExtension = file.originalname.split(".").pop();
    const image_name = Date.now() + "." + fileExtension;
    const image_path = "/images/avatars/" + image_name;

    req.body.avatar = image_path;

    cb(null, image_name); // Use current timestamp as filename
  },
});

Util.uploadProfileImage = multer({ storage: options }).single("avatar");

module.exports = Util;
