const router = require("express").Router();
const utilities = require("../utilities/index");
const { baseController } = require("../controllers/baseController");
const { invController } = require("../controllers/inv-controller");
const classValidation = require("../utilities/class-validation");
const invValidation = require("../utilities/inv-validation");

// Index route
router.get("/inv", utilities.handleErrors(invController.managePage));
router.get(
  "/inv/getInventory/:id",
  utilities.handleErrors(invController.getInventoryJSON)
);
router.get("/inv/new-class", utilities.handleErrors(baseController.newClass));
router.post(
  "/inv/new-class",
  classValidation.validate.classificationRules(),
  classValidation.validate.checkClassificationData,
  utilities.handleErrors(invController.createClass)
);
router.get("/inv/new-inv", utilities.handleErrors(baseController.newInv));
router.post(
  "/inv/new-inv",
  invValidation.validate.inventoryRules(),
  invValidation.validate.checkInventoryData,
  utilities.handleErrors(invController.createInv)
);

router.get("/inv/type/:id", invController.buildInventory);
router.get("/inventory/:id", invController.buildDetailPage);

//route to build the edit page for inventory item
router.get("/inv/edit/:id", utilities.handleErrors(invController.buildEditPage));

//route to edit an inventory item
router.post(
  "/inv/update",
  invValidation.validate.inventoryRules(),
  invValidation.validate.checkInventoryData,
  utilities.handleErrors(invController.updateInv)
);

//500 server error
router.get("/500", baseController.buildError500);
router.get("/", utilities.handleErrors(baseController.buildHome));
module.exports = router;
