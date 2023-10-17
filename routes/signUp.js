var express = require('express');
var router = express.Router();
const family = require("../controller/signUpController")
const upload = require("../middlewares/uploadFiles")

/* GET users listing. */
router.post('/', upload.single("image"),  family.signupController)

module.exports = router;
