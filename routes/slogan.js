var express = require("express");
var router = express.Router();
const slogan = require("../controller/sloganController");

router.post("/", slogan.addSlogan);
router.get("/", slogan.getAllSlogan);
router.get("/active", slogan.getActiveSlogan);
router.patch("/:id", slogan.activateSlogan);

module.exports = router;
