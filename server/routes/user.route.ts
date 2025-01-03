import { Router } from "express";
import {
    activateUser, getAllUsers,getAllStudents, getUserInfo, loginUser, logoutUser, registerUser,
    socialAuth, updateAccessToken, updateAvatar, updatePassword, updateUserInfo, updateUserRole,
    getAllUsersByInstructorCourses, getAllAdminAndInstructor, addNewMember, deleteMember
} from "../controller/user.controller";
import { isAdmin, isAuthenticated, isInstructor } from "../middleware/auth";

const userRouter = Router()



userRouter.post('/registration', registerUser)
userRouter.post('/activate-user', activateUser)
userRouter.post('/login', loginUser)
userRouter.get('/logout', updateAccessToken, isAuthenticated, logoutUser)
userRouter.get('/refresh-token', updateAccessToken)
userRouter.get('/userinfo', isAuthenticated, getUserInfo)
userRouter.post('/social-auth', socialAuth)
userRouter.post('/update-userinfo', updateAccessToken, isAuthenticated, updateUserInfo)
userRouter.put('/update-user-password', updateAccessToken, isAuthenticated, updatePassword)
userRouter.put('/update-user-avatar', updateAccessToken, isAuthenticated, updateAvatar)


// ======================== only for Admin ======================== 
userRouter.get('/get-all-users', updateAccessToken, isAuthenticated, isAdmin, getAllUsers)
userRouter.get('/get-all-students', updateAccessToken, isAuthenticated, isAdmin, getAllStudents)
userRouter.put('/update-user-role', updateAccessToken, isAuthenticated, isAdmin, updateUserRole)
userRouter.get('/get-all-admins-instructors', updateAccessToken, isAuthenticated, isAdmin, getAllAdminAndInstructor)
userRouter.post('/add-new-member', updateAccessToken, isAuthenticated, isAdmin, addNewMember)
userRouter.delete('/delete-member/:id', updateAccessToken, isAuthenticated, isAdmin, deleteMember)


// ======================== only for Instructor ======================== 
userRouter.post('/get-all-users-by-instructor-courses', updateAccessToken, isAuthenticated, isInstructor, getAllUsersByInstructorCourses)

export default userRouter