const Testimonial = require("../services/TestimonialServices");
const { nanoid } = require("nanoid");
const fs = require("fs");

exports.addTestimonial = async (req, res) => {
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
          testimonial:req.body.testimonial,
          old_position: req.body.old_position,
          season: Number(req.body.season),
          image: req.file.filename,
        };
        const add = await Testimonial.addTestimonial(data);
        if (add) {
          return res.status(200).json({ msg: "Added Testimonial" });
        } else res.status(404).json({ msg: "Not Added Testimonial" });
      } catch (error) {
        res.status(500).json({ errors: "Internal Server Error" });
      }
}

exports.getAllTestimonial = async (req, res) => {
    try {
        const data = await Testimonial.getAllTestimonial();
        if (data.length > 0) {
          return res.status(200).json({ msg: data });
        } else {
          return res.status(404).json({ msg: "Testimonial not found" });
        }
      } catch (error) {
        res.status(500).json({ errors: "internal error" });
      }
}

exports.getSingleTestimonial = async (req, res) => {
    try {
        const data = await Testimonial.getSingleTestimonial(req.params.id);
        if (data.length > 0) {
          return res.status(200).json({ msg: data });
        } else {
          return res.status(404).json({ msg: "Testimonial not found" });
        }
      } catch (error) {
        res.status(500).json({ errors: "internal error" });
      }
}

exports.updateTestimonial = async (req, res) => {
    try {
        let TestimonialUpdate = await Testimonial.getSingleTestimonial(req.params.id);
        if (!TestimonialUpdate[0]) {
          return res.status(404).json({ errors: ["Testimonial not found"] });
        }
        if (fs.existsSync("./upload/" + TestimonialUpdate[0].image)) {
            
          fs.unlinkSync("./upload/" + TestimonialUpdate[0].image);
        }
        if (req.file) {
          req.body.image = req.file.filename;
        }
        let result = await Testimonial.updateTestimonial(req.body, req.params.id);
    
        if (!result) {
          return res.status(400).send("Testimonial not updated");
        }
        return res.status(200).send("updated successfully");
      } catch (error) {
        console.log(error);
        res.status(500).json({ errors: "internal error" });
      }
}

exports.deleteTestimonial = async (req, res) => {
    try {
        const Testimonials = await Testimonial.getSingleTestimonial(req.params.id);
        if( !Testimonials[0] ) throw new Error ("No Testimonials found with this id-"+req.params.id);
        fs.unlinkSync("./upload/" + Testimonials[0].image);
        const unlink = await Testimonial.deleteTestimonial(req.params.id)
        if (unlink) {
          return res.status(200).json({ msg: "Testimonial deleted successfully" });
        } else return res.status(404).json({ msg: "Testimonial not found" });
      } catch (error) {
        res.status(500).json({ errors: "internal error", msg: error.message });
      }
}

