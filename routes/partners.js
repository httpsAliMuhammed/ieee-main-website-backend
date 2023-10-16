var express = require("express");
var router = express.Router();
const partners = require("../controller/partnersController");
const upload = require("../middlewares/uploadFiles")

router.post("/", upload.single("image"), partners.addPartner)
router.get("/", partners.getPartners)
router.patch("/:id", upload.single("image"), partners.updatePartner)
router.delete("/:id", partners.deletePartner)

module.exports = router