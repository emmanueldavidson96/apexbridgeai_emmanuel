const jwt = require("jsonwebtoken");

const verifyToken = (request, response, next) => {
    const token = request.cookies.apexBridgeToken;
    if(!token) {
        return response.status(401).json({
            success: false,
            message: "Unauthorised - no token provided"
        })
    }
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        if(!decodedToken){
            return response.status()
        }
        request.userId = decodedToken.userId;
        next()
    }
    catch(error){
        console.log(error)
    }
}

module.exports = verifyToken