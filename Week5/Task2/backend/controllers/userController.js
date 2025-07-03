import UserModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// Function to create JWT tokens
const createAccessToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "15m" }); // Access token valid for 15 minutes
};

const createRefreshToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" }); // Refresh token valid for 7 days
};

// Login User
const LoginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "User doesn't exist" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid Credentials" });
        }

        // Generate Tokens
        const accessToken = createAccessToken(user._id);
        const refreshToken = createRefreshToken(user._id);

        // Set HTTP-only cookie with refresh token
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Secure only in production
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        // Set HttpOnly cookie with Access Token
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 15 * 60 * 1000, // 15 minutes
        });

        return res.status(200).json({ success: true, message: "Logged In",accessToken});
    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};





// Register User
const RegisterUser = async (req, res) => {
    try {
        const { email, password, name } = req.body;

        // Check if the user already exists
        const userExist = await UserModel.findOne({ email });
        if (userExist) {
            return res.status(400).json({ success: false, message: "User already registered" });
        }

        // Validate email format
        if (!email) {
            return res.status(400).json({ success: false, message: "Email is required" });
        }
        
        // Validate email format using validator.js
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Invalid email format" });
        }
        // Validate password length
        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "Password must be at least 8 characters" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new UserModel({
            email,
            name,
            password: hashedPassword
        });

        // Save user first
        await newUser.save();

        // Generate JWT token
        const token = createAccessToken(newUser._id);
        const refreshToken = createRefreshToken(newUser._id);

        // Set HttpOnly Cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 15 * 60 * 1000, // 15 minutes
        });
        res.cookie("refreshToken", refreshToken, {
            httpOnly:true,

 secure:process.env.NODE_ENV ==="production",
sameSite:"Strict",
   maxAge: 7 * 24 * 60 * 60 * 1000,      })
   
// "token" → Key (Cookie Name)
// token → Value (Generated JWT Token)
// 📌 Explanation
// The key ("token") is the name of the cookie that will store the JWT token.
// The value (token) is the actual JWT token that was generated using:

        return res.status(201).json({ success: true, message: "User registered successfully" });
    } catch (error) {
        console.error("Error in register:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};


const singleUser = async (req, res)=>{
    try {
        const token = req.cookies.accessToken;
        if (!token) {
            return res.status(401).json({ success: false, message: "Not authenticated" });
        }
    
        const decoded = jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ success: false, message: "Token expired or invalid" });
            }
            return decoded;
        });
    
        const user = await UserModel.findById(decoded.id).select("name email");
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
    
        return res.status(200).json({ success: true, user });
    } catch (error) {
        console.error("Error fetching user:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
    
}


// Ensure this function exists in your controller
 const logoutUser = (req, res) => {
    // Clear the token cookie
    try {
        res.clearCookie("accessToken");  // Clear the access token from cookies
        return res.status(200).json({ success: true, message: "Logged out successfully"});
    } catch (error) {
        console.error("LogOut Error",error);
    }
};

export {LoginUser,RegisterUser,singleUser,logoutUser}