import { Router } from "express";
import { activateUser, getUserInfo, loginUser, logoutUser, registerUser, socialAuth, updateAccessToken } from "../controller/user.controller";
import { isAuthenticated } from "../middleware/auth";

const userRouter = Router()

userRouter.post('/registration', registerUser)
userRouter.post('/activate-user', activateUser)
userRouter.post('/login', loginUser)
userRouter.get('/logout', isAuthenticated, logoutUser)
userRouter.get('/refresh-token', updateAccessToken)
userRouter.get('/userinfo', isAuthenticated, getUserInfo)
userRouter.get('/social-auth', socialAuth)


export default userRouter