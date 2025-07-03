import jwt from 'jsonwebtoken';
import UserModel from "../models/userModel.js";

export const protectRoute = async (req, res, next) => {
    try {
        // Extract token from the cookie
        const token = req.cookies.accessToken;

        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorized: No Access Token" });
        }

        // Verify JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Check if token has a valid user ID
        if (!decoded || !decoded.id) {
            return res.status(401).json({ success: false, message: "Unauthorized: Invalid Token" });
        }

        // Fetch user from the database and attach it to the request object
        req.user = await UserModel.findById(decoded.id).select("-password");
        
        if (!req.user) {
            return res.status(401).json({ success: false, message: "Unauthorized: User Not Found" });
        }
        next();
    } catch (error) {
        console.error("Auth Error:", error);

        // Handle specific errors like token expiration
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ success: false, message: "Token Expired" });
        }

        return res.status(401).json({ success: false, message: "Invalid or Expired Access Token" });
    }
};
