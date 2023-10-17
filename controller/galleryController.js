const gallery = require("../services/galleryServices");
const { nanoid } = require("nanoid");
const fs = require("fs");

exports.addGallery = async (req, res) => {
  try {
    const nIds = Array.from({ length: req.files.length }, () => nanoid(10));

    if (!req.files || req.files.length === 0) {
      // Check if any image files exist
      return res.status(400).json({
        errors: [{ msg: "Images are required" }],
      });
    }

    const data = req.files.map((file, index) => ({
      id: nIds[index],
      image: file.filename,
      season: req.body.season,
    }));

    const result = await gallery.addGallery(data);
    if (result) {
      return res.status(200).json({ msg: "Gallery Added" });
    } else {
      return res.status(401).json({ msg: "Gallery Not Added" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

exports.getAllGallery = async (req, res) => {
  try {
    const data = await gallery.getAllGallery(req.params.season);
    if (data.length > 0) {
      data.map((season) => {
        season.image = "http://" + req.hostname + ":3000/" + season.image;
      });
      return res.status(200).json(data);
    } else {
      return res.status(401).json({ msg: "Nothing Found" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

exports.deleteImage = async (req, res) => {
  try {
    const image = await gallery.getImage(req.params.id);
    fs.unlinkSync("./upload/" + image[0].image);
    const remove = await gallery.deleteImage(req.params.id);
    if (remove) {
      return res.status(200).json({ msg: "Image Deleted" });
    } else {
      return res.status(404).json({ msg: "Image not deleted" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};
