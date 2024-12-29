const express = require("express");
const { createArticle, getAllArticles, editArticle, deleteArticle, articleInfo, userArticles,latestArticles, recommendedArticles, relatedArticles } = require("../Controllers/Article.controller");
const verifyToken = require("../Middlewares/verifyToken");
const upload = require("../Middlewares/multer");

const articleRoute = express.Router(); 

articleRoute.post("/article/add-article", verifyToken, upload.single("articleImage"), createArticle); //Done
articleRoute.get("/articles", getAllArticles); //Done
articleRoute.put("/articles/:id", verifyToken, upload.single("articleImage"), editArticle ); //Done
articleRoute.delete("/articles/:id", verifyToken, deleteArticle); //Done
articleRoute.get("/articles/:id", articleInfo); //Done
articleRoute.get("/articles/user-articles/user", verifyToken, userArticles) //Done
articleRoute.get("/articles/recommend/latest_articles", latestArticles)
articleRoute.get("/articles/recommend/recommended_articles", recommendedArticles)
articleRoute.post("/articles/related/related_articles", relatedArticles)
// articleRoute.get("/username/:id", findUserById);


module.exports = articleRoute