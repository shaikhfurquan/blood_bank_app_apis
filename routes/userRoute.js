import express  from "express";
import { getCurrentUser, loginUser, registerUser } from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const userRouter = express.Router();

userRouter.post('/register' , registerUser)
userRouter.post('/login' , loginUser)
userRouter.get('/current-user' , isAuthenticated , getCurrentUser)

export default userRouter