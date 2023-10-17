const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { nanoid } = require("nanoid");
const person = require("../services/signUpServices");
require("dotenv").config();

exports.signupController = async (req, res) => {
  try {
    const nId = await nanoid(10);
    const mail = await person.getEmail(req.body.email);
    if (mail.length > 0) {
      return res.status(400).json({ msg: "Email already registered" });
    }
    const user = {
      id: nId,
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 10),
      committee: req.body.committee,
      chapter: req.body.chapter,
      linkedin: req.body.linkedin,
      linkFacebook: req.body.linkFacebook,
      college: req.body.college,
      image: req.file.filename,
      role: req.body.role,
      position: req.body.position,
      director_type: req.body.director_type,
    };

    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      service: "Gmail",
      port: 587,
      secure: false,
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });

    let message = {
      from: "IEEE", // Use your organization's name
      to: req.body.email,
      subject: "Congratulations :heart::tada:",
      html: "<p>You have successfully joined with us.</p>", // Use HTML for better formatting

      // Set email priority headers
      headers: {
        "X-Priority": "1 (Highest)",
        "X-MSMail-Priority": "High",
      },
    };

    await transporter.sendMail(message).catch((error) => {
      // Handle email sending errors gracefully
      console.error(error);
      return res.status(500).json({ msg: "Internal Server Error" });
    });

    await person.insertPerson(user);
    const token = await jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: process.env.JWT_EXPIRE_TIME,
      }
    );
    delete user.password;

    return res.status(201).json({ status: "OK", data: user, token: token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};
