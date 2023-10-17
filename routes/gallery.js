const express = require('express');
const router = express.Router();
const gallery = require("../controller/galleryController");
const upload = require("../middlewares/uploadFiles");

router.post("/", upload.array("images", ), gallery.addGallery);
router.get("/:season", gallery.getAllGallery)
router.delete("/:id", gallery.deleteImage)

module.exports = router;