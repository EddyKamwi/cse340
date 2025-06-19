const express = require("express");
const router = express.Router();
const utilities = require("../utilities/index");
const { baseController } = require("../controllers/baseController");

//500 server error
router.get("/500", baseController.buildError500);
router.get("/", utilities.handleErrors(baseController.buildHome));

module.exports = router;
