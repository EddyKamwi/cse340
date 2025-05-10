const router = require("express").Router();
const AppController = require("../controllers/app-controller");

router.get("/", AppController.index);
router.get("/custom", AppController.custom);
router.get("/suv", AppController.suv);
router.get("/sedan", AppController.sedan);
router.get("/truck", AppController.truck);
module.exports = router;
