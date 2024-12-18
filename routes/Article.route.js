const express = require("express");
const { createArticle, getAllArticles, editArticle, deleteArticle, articleInfo, userArticles } = require("../Controllers/Article.controller");
const verifyToken = require("../Middlewares/verifyToken");
const upload = require("../Middlewares/multer");

const articleRoute = express.Router(); 

articleRoute.post("/articles/add-article", verifyToken, upload.single("articleImage"), createArticle); //Done
articleRoute.get("/articles/all-articles", getAllArticles); //Done
articleRoute.put("/articles/:id", verifyToken, upload.single("articleImage"), editArticle ); //Done
articleRoute.delete("/articles/:id", verifyToken, deleteArticle); //Done
articleRoute.get("/articles/:id", articleInfo); //Done
articleRoute.get("/articles/user-articles/user", verifyToken, userArticles) //Done


module.exports = articleRoute