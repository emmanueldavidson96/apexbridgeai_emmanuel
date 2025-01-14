const express = require("express");
const { createTestimonial, editTestimonial, getAllTestimonial, deleteTestimonial, getTestimonialInfo } = require("../Controllers/Testimonial.Controller");
const upload = require("../Middlewares/multer");
const router = express.Router();


router.post("/testimonial/create-testimonial", upload.single("testimonialImage"), createTestimonial);
router.put("/testimonial/edit-testimonial/:id", editTestimonial);
router.get("/testimonial", getAllTestimonial);
router.delete("/testimonial/:id", deleteTestimonial);
router.get("/testimonial/:id", getTestimonialInfo);

module.exports = router;