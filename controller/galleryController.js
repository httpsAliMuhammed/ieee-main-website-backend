const gallery = require("../services/galleryServices");
const { nanoid } = require("nanoid");

exports.addGallery = async (req, res) => {
  try {
    const nId1 = nanoid(10);

    if (!req.file) {
      // Check if image file exists
      return res.status(400).json({
        errors: [{ msg: "Image is Required" }],
      });
    }
    let data = {
      id: nId1,
      image: req.file.filename,
      season: req.file.season,
    };
    const result = await gallery.addGallery(data);
    if (result) {
      return res.status(200).json({ msg: "Gallery Added" });
    } else {
      return res.status(401).json({ msg: "Gallery Not Added" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
};
