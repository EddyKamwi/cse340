const express = require("express");
const app = express();
const utilities = require("../utilities/")
const router = express.Router();
const accountController = require("../controllers/account-controller");


router.get("/register", utilities.handleErrors(accountController.buildRegister
))
router.get("/", utilities.handleErrors(accountController.getAccount));

module.exports = router;
