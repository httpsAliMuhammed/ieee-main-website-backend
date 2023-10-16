const partners = require("../services/partnersServices");
const { nanoid } = require("nanoid");
const fs = require("fs");

exports.addPartner = async (req, res) => {
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
      name: req.body.name,
      image: req.file.filename,
      page_link: req.body.page_link,
    };
    const add = await partners.addPartner(data);
    if (add) {
      return res.status(200).json({ msg: "Added partner" });
    } else res.status(404).json({ msg: "Not Added partner" });
  } catch (error) {
    res.status(500).json({ errors: "Internal Server Error" });
  }
};

exports.getPartners = async (req, res) => {
  try {
    const data = await partners.getpartners();
    if (data.length > 0) {
      data.map((partner) => {
        partner.image = "http://" + req.hostname + ":3000/" + partner.image;
      });
      return res.status(200).json(data);
    } else return res.status(404).json({ msg: "Not Found" });
  } catch (error) {
    res.status(500).json({ errors: "Internal Server Error" });
  }
};

exports.updatePartner = async (req, res) => {
  try {
    let partner = await partners.getpartner(req.params.id);
    if (!partner[0]) {
      return res.status(404).json({ errors: ["partner not found"] });
    }
    if (fs.existsSync("../upload" + partner[0].image)) {
      fs.unlinkSync("../upload/" + partner[0].image);
    }
    if (req.file) {
      req.body.image = req.file.filename;
    }
    let result = await partners.updatePartner(req.body, req.params.id);

    if (!result) {
      return res.status(400).send("Partner not updated");
    }
    return res.status(200).send("updated successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: "internal error" });
  }
};

exports.deletePartner = async (req, res) => {
  try {
    const partner = await partners.getpartner(req.params.id);
    console.log(partner);
    fs.unlinkSync("./upload/" + partner[0].image);
    const unlink = await partners.deletePartner(req.params.id)
    if (unlink) {
      return res.status(200).json({ msg: "partner deleted successfully" });
    } else return res.status(404).json({ msg: "partner not found" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: "internal error" });
  }
};
