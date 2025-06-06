const router = require("express").Router();
const utilities = require("../utilities/index");
const AppController = require("../controllers/app-controller");
const { baseController } = require("../controllers/baseController");
const { invController } = require("../controllers/inv-controller");

// Index route
// router.get("/", baseController.buildHome);
router.get('/inv/type/:id', invController.buildInventory);
router.get('/inventory/:id', invController.buildDetailPage);
router.get("/custom", AppController.custom);
router.get("/suv", AppController.suv);
router.get("/sedan", AppController.sedan);
router.get("/truck", AppController.truck);
//500 server error
router.get("/500", (req, res, next) => {
    new Error("Server Error");
    res.status(500);
    res.render("errors/error", {
        title: "500",
        nav: utilities.getNav(),
        message: "Something went wrong, please try again later.",
        error: new Error("Server Error")
    });
});



router.get("/", utilities.handleErrors(baseController.buildHome))
module.exports = router;

