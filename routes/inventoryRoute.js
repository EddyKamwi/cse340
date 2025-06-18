const router = require("express").Router();
const utilities = require("../utilities/index");
const { baseController } = require("../controllers/baseController");
const { invController } = require("../controllers/inv-controller");
const classValidation = require("../utilities/class-validation");
const invValidation = require("../utilities/inv-validation");

// Index route
router.get(
  "/",
  utilities.checkLogin,
  utilities.handleErrors(invController.managePage)
);
router.get(
  "/getInventory/:id",
  utilities.checkLogin,
  utilities.handleErrors(invController.getInventoryJSON)
);
router.get("/new-class", utilities.handleErrors(baseController.newClass));
router.post(
  "/new-class",
  utilities.checkLogin,
  classValidation.validate.classificationRules(),
  classValidation.validate.checkClassificationData,
  utilities.handleErrors(invController.createClass)
);
router.get(
  "/new-inv",
  utilities.checkLogin,
  utilities.handleErrors(baseController.newInv)
);
router.post(
  "/new-inv",
  utilities.checkLogin,
  invValidation.validate.inventoryRules(),
  invValidation.validate.checkInventoryData,
  utilities.handleErrors(invController.createInv)
);

router.get("/type/:id", invController.buildInventory);
router.get("/inventory/:id", invController.buildDetailPage);

//route to build the edit page for inventory item
router.get(
  "/edit/:id",
  utilities.checkLogin,
  utilities.handleErrors(invController.buildEditPage)
);

//route to edit an inventory item
router.post(
  "/update",
  utilities.checkLogin,
  invValidation.validate.inventoryRules(),
  invValidation.validate.checkInventoryData,
  utilities.handleErrors(invController.updateInv)
);

router.get(
  "/delete/:id",
  utilities.checkLogin,
  utilities.handleErrors(invController.confirmDeleteInv)
);

router.post(
  "/delete/:id",
  utilities.checkLogin,
  utilities.handleErrors(invController.deleteInv)
);

module.exports = router;
