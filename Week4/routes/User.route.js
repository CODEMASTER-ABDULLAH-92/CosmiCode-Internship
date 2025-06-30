import express from 'express'
import {addUser, getUser, removeUser, updateUser} from "../controllers/AssignmentApis.js"
export const userRouter = express.Router();


userRouter.post("/add", addUser);
userRouter.put("/update/:id", updateUser);
userRouter.delete("/remove", removeUser);
userRouter.get("/get", getUser);
