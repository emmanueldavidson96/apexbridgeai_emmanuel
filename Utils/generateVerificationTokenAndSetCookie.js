const jwt = require("jsonwebtoken");

const generateTokenAndSetCookie = (response, userId) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: "7d"
    })

    response.cookie("apexBridgeToken", token, {
        httpOnly:true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    })

    return token
}

module.exports = generateTokenAndSetCookie;