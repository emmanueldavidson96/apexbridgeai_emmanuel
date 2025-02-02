const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
    authorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User" 
    },
    authorName:{
        type:String,
        required:true
    },
    articleTitle: {
        type: String,
        required:true
    },
    articleBody:{
        type:String,
        required: true,
    },
    articleImage:{
        type: String
    },
    cloudinary_id:{
        type:String,
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