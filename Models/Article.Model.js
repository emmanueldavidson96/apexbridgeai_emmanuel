const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User" 
    },
    articleTitle: {
        type: String,
        required:true
    },
    articleBodySectionOne:{
        type:String,
        required: true,
    },
    articleImage:{
        type: String
    },
    cloudinary_id:{
        type:String,
    },
    articleBodySectionTwo:{
        type:String,
        required:true
    },
    // articleImageInside:{
    //     type:String,
    // },
    articleQuote:{
        type:String,
    },
    articleConclusion:{
        type:String,
    },
    articleCategory:{
        type:String,
    },
    articleDesc:{
        type:String,
        required:true
    }

},{
    timestamps:true
})

module.exports = mongoose.model("Article", articleSchema);