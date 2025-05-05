const router = require("express").Router()
const AppController = require("../controllers/app-controller")



router.get('/', AppController.index)
module.exports = router