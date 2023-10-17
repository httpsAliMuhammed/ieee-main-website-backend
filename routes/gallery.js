var express = require('express');
var router = express.Router();
const gallery = require("../controller/galleryController")
const upload = require("../middlewares/uploadFiles")