const UserModel = require("../Models/User.Model");
const bcrypt = require("bcryptjs");
const generateVerificationCode = require("../Utils/generateVerificationCode");
const { sendVerificationEmail } = require("../Mail/Emails");
const generateTokenAndSetCookie = require("../Utils/generateVerificationTokenAndSetCookie");


const signUpHandler = async (request, response) => {
    const {email, password, firstName, lastName} = request.body;
    try{
        if(!email || !password || !firstName || !lastName){
            throw new Errow(`All fields are required`)
        }
        const alreadyExistingUser  = await UserModel.findOne({email});
        if(alreadyExistingUser){
            return response.status(400).json({
                success: false,
                message: "User already exists"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationCode = generateVerificationCode();
        const newUser = new UserModel({
            email:email,
            password:hashedPassword,
            firstName: firstName,
            lastName:lastName,
            verificationToken:verificationCode,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000 // 24 Hours
        })
        await newUser.save();
        // jwt token
        generateTokenAndSetCookie(response, newUser._id)
        // Send Verification Code to User Email for Verification
        await sendVerificationEmail(newUser.email, verificationCode);
        return response.status(201).json({
            success:true,
            message: "User created successfully",
            newUser
        })               
    }
    catch(error){
        console.log("Error verifying email")
        return response.status(400).json({
            success: false,
            message: error.message
        })
    }
}

const loginHandler = async (request, response) => {
    const {email, password} = request.body;
    try{
        const user = await UserModel.findOne({email});
        if(!user){
            return response.status(400).json({
                success:false,
                message: "Invalid credentials"
            })
        }

        const isPasswordValid = bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return response.status(400).json({
                success:false,
                message: "Invalid credentials"
            })
        }

        generateTokenAndSetCookie(response, user._id);
        user.lastLogin = new Date();
        await user.save();
        return response.status(200).json({
            success:true,
            message: "Successfully logged in",
            user
        })
    }
    catch(error){
        console.log("Error in login", error)
        return response.status(400).json({
            success: false,
            message: error.message
        })
    }
}

const checkAuthentiocationAndGetProfile = async (request, response) => {
    try{
        const user = await UserModel.findById(request.userId).select("-password")
        if(!user) {
            return response.status(400).json({
                success: false,
                message: "User not found"
            })
        }

        return response.status(200).json({
            success: true,
            user
        })
        
    }
    catch(error){
        console.log(error)
        return response.status(400).json({
            success: false,
            message: "Something went wrong"
        })
    }
}

const logoutHandler = async (request, response) => {
    response.clearCookie("apexBridgeToken");
    response.status(200).json({
        success: true,
        message:"User logged out successfully"
    })
}

module.exports = {
    signUpHandler,
    loginHandler,
    logoutHandler,
    checkAuthentiocationAndGetProfile
}