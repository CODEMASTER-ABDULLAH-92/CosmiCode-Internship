import express from 'express';
import { LoginUser, logoutUser, RegisterUser } from '../controllers/userController.js';
import { protectRoute } from '../middleware/authMiddleware.js'; // Import protectRoute middleware
import { singleUser } from '../controllers/userController.js'; // Import the singleUser function

const UserRouter = express.Router();

UserRouter.post("/loginUser", LoginUser);
UserRouter.post("/registerUser", RegisterUser);
UserRouter.get("/profile", protectRoute, (req, res) => {
    res.json({ success: true, message: "Access granted to profile", user: req.user });
});
UserRouter.post("/logout", logoutUser);
UserRouter.get("/me", protectRoute, singleUser);
export default UserRouter;