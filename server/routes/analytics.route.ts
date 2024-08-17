import { Router } from "express"
import { isAdmin, isAuthenticated } from "../middleware/auth"
import { getCourseAnalytics, getUserAnalytics } from "../controller/analytics.controller"

const analyticsRouter = Router()


analyticsRouter.get('/get-users-analytics', isAuthenticated, isAdmin,  getUserAnalytics)
analyticsRouter.get('/get-courses-analytics', isAuthenticated, isAdmin,  getCourseAnalytics)



export default analyticsRouter