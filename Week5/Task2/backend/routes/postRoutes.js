import express from 'express'
import upload from '../middleware/multerMiddleware.js';
import { addPost,listPost,deletePost,updatePost } from '../controllers/PostControllers.js'
const postRouter = express.Router();

postRouter.post("/addPost", upload.array("image", 10), addPost);
postRouter.get("/listing",listPost);
postRouter.delete("/remove/:id",deletePost);
postRouter.put("/update/:id",updatePost);
export default postRouter;