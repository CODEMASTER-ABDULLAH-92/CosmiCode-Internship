import express from 'express';
import { getSingleUser, LoginUser, LogoutUser, registerUser } from '../controllers/user.controllers.js';
import { verifyToken } from '../middlewares/authMiddlare.js';

export const userRouter = express.Router();


userRouter.post("/register", registerUser);
userRouter.post("/login",verifyToken, LoginUser);
userRouter.post("/logout", LogoutUser);
userRouter.get("/singleUser/:id", verifyToken, getSingleUser);