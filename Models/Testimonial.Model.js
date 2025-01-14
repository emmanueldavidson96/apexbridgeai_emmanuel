const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema({
    testimonialImage:{
        type: String
    },
    cloudinary_id:{
        type:String,
    },
    testimonialAuthor:{
        type:String
    },
    testimonialText:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model("Testimonial", testimonialSchema);