const sloganService = require("../services/sloganServices");
const { nanoid } = require("nanoid");

exports.addSlogan = async (req, res) => {
  try {
    const nId = nanoid(10);

    let data = {
      id: nId,
      slogan: req.body.slogan,
      season: req.body.season,
    };
    const slogan = await sloganService.addSlogan(data);
    if (slogan) {
      return res.status(200).json({ msg: "Slogan added successfully" });
    } else {
      return res.status(403).json({ msg: "Slogan not added" });
    }
  } catch (error) {
    res.status(500).json({ errors: "internal error" });
  }
};

exports.getAllSlogan = async (req, res) => {
  try {
    const data = await sloganService.getAllSlogan();
    if (data.length > 0) {
      return res.status(200).json({ msg: data });
    } else {
      return res.status(404).json({ msg: "Slogans not found" });
    }
  } catch (error) {
    res.status(500).json({ errors: "internal error" });
  }
};

exports.getActiveSlogan = async (req, res) => {
  try {
    const data = await sloganService.getActiveSlogan();
    if (data.length > 0) {
      return res.status(200).json({ msg: data });
    } else {
      return res.status(404).json({ msg: "Not Slogans active" });
    }
  } catch (error) {
    res.status(500).json({ errors: "internal error" });
  }
};

exports.activateSlogan = async (req, res) => {
  try {
    const active = await sloganService.activateSlogan(req.params.id);
    if (active) {
      return res.status(200).json({ msg: "Done" });
    } else return res.status(403).json({ msg: "Invalid" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: "internal error" });
  }
};
