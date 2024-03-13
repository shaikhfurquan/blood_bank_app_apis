
import JWT from 'jsonwebtoken'

export const isAuthenticated = async(req, res, next) => {
    try {
        console.log("isAuthenticated");
        const token = req.headers['authorization'].split(" ")[1]
        console.log("token" , token);
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized - Token not provided"
            });
        }

        // Decode/verify the token
        const decodedUserData = JWT.verify(token, process.env.JWT_SECRET);
        // console.log("decodedUserData" , decodedUserData);

        // Attach user information to the request for further processing
        req.user = decodedUserData;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid Token",
            error: error.message 
        });
    }
}