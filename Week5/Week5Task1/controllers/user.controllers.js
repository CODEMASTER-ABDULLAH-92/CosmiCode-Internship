import user from "../models/user.model.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sendResponse from "../utils/sendResponse.js";

export const registerUser = async (req, res) => {
  try {
    const { email, userName, password } = req.body;

    if (!email || !userName || !password) {
      return sendResponse(res, 400, false, "All fields are required");
    }

    const isUserExist = await user.findOne({ email });
    if (isUserExist) {
      return sendResponse(res, 409, false, "User already exists");
    }

    if (!validator.isEmail(email)) {
      return sendResponse(res, 400, false, "Email is not valid");
    }

    if (password.length < 8) {
      return sendResponse(res, 400, false, "Password must be at least 8 characters");
    }

    if (!/[A-Z]/.test(password)) {
      return sendResponse(res, 400, false, "Password must contain at least one uppercase letter");
    }

    if (!/[a-z]/.test(password)) {
      return sendResponse(res, 400, false, "Password must contain at least one lowercase letter");
    }

    if (!/\d/.test(password)) {
      return sendResponse(res, 400, false, "Password must contain at least one digit");
    }

    if (!/[(*&^%$#@!~)]/.test(password)) {
      return sendResponse(res, 400, false, "Password must contain at least one special character");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await user.create({
      email,
      userName,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_VERIFY_KEY, { expiresIn: "7d" });

    res.cookie("token", token);
    return sendResponse(res, 201, true, "User registered successfully", {
      user: newUser,
      token,
    });
  } catch (error) {
    console.error("Error in registerUser:", error);
    return sendResponse(res, 500, false, "Error in user registration", { error });
  }
};

export const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const isUserExist = await user.findOne({ email });
    if (!isUserExist) {
      return sendResponse(res, 404, false, "User not found");
    }

    const isMatch = await bcrypt.compare(password, isUserExist.password);
    if (!isMatch) {
      return sendResponse(res, 401, false, "Invalid password");
    }

    const token = jwt.sign({ id: isUserExist._id }, process.env.JWT_VERIFY_KEY, { expiresIn: "7d" });

    res.cookie("token", token);
    return sendResponse(res, 200, true, "User logged in successfully", {
      user: isUserExist,
      token,
    });
  } catch (error) {
    console.error("Error in LoginUser:", error);
    return sendResponse(res, 500, false, "Error logging in", { error });
  }
};

export const LogoutUser = async (req, res) => {
  try {
    res.clearCookie("token");
    return sendResponse(res, 200, true, "User logged out successfully");
  } catch (error) {
    console.error("Error in LogoutUser:", error);
    return sendResponse(res, 500, false, "Error logging out", { error });
  }
};



export const getSingleUser = async (req,res) => {
    try {
        const {id} = req.params;
        const userData = await user.findById(id);
        sendResponse(res,200,true,"Getting Single Data",userData);
      } catch (error) {
        console.log("Error ", error);
        sendResponse(res,500,false,"Getting Single Data");
    }
}