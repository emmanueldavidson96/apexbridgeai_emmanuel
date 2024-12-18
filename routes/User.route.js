const express = require("express");
const { signUpHandler, loginHandler, logoutHandler, checkAuthentiocationAndGetProfile } = require("../Controllers/User.controller");
const verifyToken = require("../Middlewares/verifyToken");

const userRoute = express.Router();

userRoute.post("/register", signUpHandler); //Done
userRoute.post("/login", loginHandler); //Done
userRoute.post("/logout", logoutHandler) //Done
userRoute.get("/profile", verifyToken, checkAuthentiocationAndGetProfile); //Done

module.exports = userRoute;