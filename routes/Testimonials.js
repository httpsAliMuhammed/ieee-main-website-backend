var express = require("express");
var router = express.Router();
const Testimonial = require("../controller/TestimonialsController");
const upload = require("../middlewares/uploadFiles")

router.get("/",Testimonial.getAllTestimonial);

router.get("/:id",Testimonial.getSingleTestimonial);

router.post("/",upload.single("image"), Testimonial.addTestimonial);

router.put("/:id", upload.single("image"),Testimonial.updateTestimonial);

router.delete("/:id",Testimonial.deleteTestimonial);


module.exports=router;