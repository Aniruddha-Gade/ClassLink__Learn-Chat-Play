import { Router } from "express";
import { activateUser, loginUser, logoutUser, registerUser, updateAccessToken } from "../controller/user.controller";
import { isAuthenticated } from "../middleware/auth";

const userRouter = Router()

userRouter.post('/registration', registerUser)
userRouter.post('/activate-user', activateUser)
userRouter.post('/login', loginUser)
userRouter.get('/logout', isAuthenticated, logoutUser)
userRouter.get('/refresh-token', updateAccessToken)


export default userRouter