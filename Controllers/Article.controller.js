const ArticleModel = require("../Models/Article.Model");
const cloudinary = require("../Utils/cloudinary");
const fs = require("fs")
// Post An Article

const createArticle = async (request, response) => {
    const {
        articleTitle,
        articleBodySectionOne,
        articleBodySectionTwo,
        articleQuote,
        articleConclusion,
        articleCategory,
        articleDesc
    } = request.body

    try{
        const userId = request.userId;
        const {path} = request.file;
        //Upload the image to cloudinary
        const result = await cloudinary.uploader.upload(path);
        const newArticle = new ArticleModel({
            articleTitle,
            articleBodySectionOne,
            articleBodySectionTwo,
            articleQuote,
            articleConclusion,
            articleCategory,
            articleDesc,
            articleImage: result.secure_url,
            cloudinary_id: result.public_id,
            author: userId,
        })
    
        await newArticle.save();
        fs.unlinkSync(path)
        return response.status(200).json({
            success:true,
            newArticle
        })  
    }

    catch(error){
        return response.status(400).json({
            success: false,
            message: "Something went wrong"
        })
    }
}

const getAllArticles = async (request, response) => {
    try{
        const allArticles = await ArticleModel.find({}).exec()
        return response.status(200).json({
            success: true,
            message: "All articles returned",
            allArticles
        })
        
    }
    catch(error){
        return response.status(400).json({
            success: false,
            message: "Something went wrong"
        })
    }
}

const  editArticle = async (request, response) => {
    const article = await ArticleModel.findById(request.params.id);
    //Delete the article image from cloudinary
    // await cloudinary.uploader.destroy(article.cloudinary_id);
    try{
        let result;
        if(request.file){
            result = await cloudinary.uploader.upload(request.file.path)
        }
        const data = {
            articleTitle: request.body.articleTitle || article.articleTitle,
            articleBodySectionOne: request.body.articleBodySectionOne || article.articleBodySectionOne,
            articleBodySectionTwo: request.body.articleBodySectionTwo || article.articleBodySectionTwo,
            articleQuote: request.body.articleQuote || article.articleQuote,
            articleConclusion: request.body.articleConclusion || article.articleConclusion,
            articleCategory: request.body.articleCategory || article.articleCategory,
            articleDesc: request.body.articleDesc || article.articleDesc,
            articleImage: result?.secure_url || article.articleImage,
            cloudinary_id: result?.public_id || article.cloudinary_id,
            author: article.author,
        }
        const editedArticle = await ArticleModel.findByIdAndUpdate(request.params.id, data, {new:true});
        if(request.file){
            fs.unlinkSync(request.file.path)
        }
        return response.status(200).json({
            success:true,
            message:"Successfully edited the article",
            editedArticle
        })
    }
    catch(error){
        return response.status(400).json({
            success: false,
            message: "Something happened"
        })
    }
}

const deleteArticle = async (request, response) => {
    const userId = request.userId;
    if(!userId){
        return response.status(404).json({
            success: false,
            message: "You are not authorized!"
        })
    }
    try{
        const deleteArticle = await ArticleModel.findByIdAndDelete(request.params.id)
        return response.status(200).json({
            success: true,
            message:"Article deleted successfully",
        })        
    }
    catch(error){
        return response.status(400).json({
            success: false,
            message:"Something happed"
        })
    }
}

const articleInfo = async (request, response) => {

    try{
        const article = await ArticleModel.findById(request.params.id);
        return response.status(200).json({
            success: true,
            message:"Article Found!",
            article
        })
    }
    catch(error){
        return response.status(400).json({
            success: false,
            message: "Article not found!"
        })
    }
}

const userArticles = async (request, response) => {
    const userId = request.userId;
    
    if(!userId){
        console.log("No user found")
    }   
    try{
        const userArticles = await ArticleModel.find({author:userId})
        return response.status(200).json({
            success: true,
            message: "User Articles served",
            userArticles
        })
    }
    catch(error){
        return response.status(400).json({
            success: false,
            message: "Something went wrong!"
        })
    }
}

module.exports = {
    createArticle,
    getAllArticles,
    editArticle,
    deleteArticle,
    articleInfo,
    userArticles
}