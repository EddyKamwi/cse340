const router = require("express").Router();
const AppController = require("../controllers/app-controller");
const { baseController } = require("../controllers/baseController");
const { invController } = require("../controllers/inv-controller");

router.get("/", baseController.buildHome);
router.get('/inv/type/:id', invController.buildInventory);
router.get("/custom", AppController.custom);
router.get("/suv", AppController.suv);
router.get("/sedan", AppController.sedan);
router.get("/truck", AppController.truck);
module.exports = router;
