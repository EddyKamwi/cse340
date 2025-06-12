const router = require("express").Router();
const utilities = require("../utilities/index");
const AppController = require("../controllers/app-controller");
const { baseController } = require("../controllers/baseController");
const { invController } = require("../controllers/inv-controller");

// Index route
router.get("/inv", utilities.handleErrors(baseController.managePage));
router.get("/inv/new-class", utilities.handleErrors(baseController.newClass));
router.post("/inv/new-class", utilities.handleErrors(invController.createClass));
router.get("/inv/new-inv", utilities.handleErrors(baseController.newInv));
router.post("/inv/new-inv", utilities.handleErrors(baseController.createInv));


router.get("/inv/type/:id", invController.buildInventory);
router.get("/inventory/:id", invController.buildDetailPage);
router.get("/custom", AppController.custom);
router.get("/suv", AppController.suv);
router.get("/sedan", AppController.sedan);
router.get("/truck", AppController.truck);

//500 server error
router.get("/500", baseController.buildError500);

router.get("/", utilities.handleErrors(baseController.buildHome));
module.exports = router;
