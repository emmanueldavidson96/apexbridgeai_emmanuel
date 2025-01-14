const TestimonialModel = require("../Models/Testimonial.Model");
const cloudinary = require("../Utils/cloudinary");
const fs = require("fs")

const createTestimonial = async (request, response) => {
    const {testimonialAuthor, testimonialText} = request.body;
    try{
        const {path} = request.file;
        // //Upload the image to cloudinary
        const result = await cloudinary.uploader.upload(path);
        const new_testimonial = new TestimonialModel({
            testimonialAuthor: testimonialAuthor,
            testimonialText:testimonialText,
            testimonialImage:result.secure_url,
            cloudinary_id:result.public_id
        })
        await new_testimonial.save();
        // fs.unlinkSync(path)
        return response.status(200).json({
            success:true,
            message:"Testimonial created",
            new_testimonial
        })
    }catch(error){
        console.error(error);
        return response.status(400).json({
            success:false,
            message:"Unable to create Testimonial"
        })
    }
}

const editTestimonial = async (request, response) => {
    const {id} = request.params;
    const {testimonialAuthor, testimonialText} = request.body
    try{
        const editTestimonial = await TestimonialModel.findByIdAndUpdate(id, {
            testimonialAuthor: testimonialAuthor,
            testimonialText:testimonialText
        })
        await editTestimonial.save()
        return response.status(200).json({
            success:true,
            message:"Testimonial edited",
            editTestimonial
        })
    }catch(error){
        console.error(error);
        return response.status(400).json({
            success:false,
            message:"Testimonial could not be edited!"
        })
    }
}

const getAllTestimonial = async (request, response) => {
    try{
        const testimonials = await TestimonialModel.find();
        return response.status(200).json({
            success:true,
            message:"Testimonial retrieved",
            testimonials
        })
    }catch(error){
        console.error(error);
        return response.status(400).json({
            success:false,
            message:"Testimonial could not be edited!"
        })
    }
}

const deleteTestimonial = async (request, response) => {
    const {id} = request.params
    try{
        const testimonial = await TestimonialModel.findByIdAndDelete(id);
        return response.status(200).json({
            success:true,
            message:"Testimonial deleted",
        })
    }catch(error){
        console.error(error);
        return response.status(400).json({
            success:false,
            message:"Testimonial could not be edited!"
        })
    }
}

const getTestimonialInfo = async (request, response) => {
    const {id} = request.params;
    try{
        const testimonial = await TestimonialModel.findById(id);
        return response.status(200).json({
            success:true,
            message:"Testimonial retrieved",
            testimonial
        })

    }catch(error){
        console.error(error);
        return response.status(400).json({
            success:false,
            message:"Testimonial could not retrieved"
        })
    }
}

module.exports = {
    createTestimonial,
    editTestimonial,
    getAllTestimonial,
    deleteTestimonial,
    getTestimonialInfo
}