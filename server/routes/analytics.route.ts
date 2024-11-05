import { Router } from "express"
import { isAdmin, isAuthenticated } from "../middleware/auth"
import { getCourseAnalytics, getOrdersAnalytics, getUserAnalytics } from "../controller/analytics.controller"
import { updateAccessToken } from "../controller/user.controller"

const analyticsRouter = Router()


analyticsRouter.get('/get-users-analytics', updateAccessToken, isAuthenticated, isAdmin, getUserAnalytics)
analyticsRouter.get('/get-courses-analytics', updateAccessToken, isAuthenticated, isAdmin, getCourseAnalytics)
analyticsRouter.get('/get-orders-analytics', updateAccessToken, isAuthenticated, isAdmin, getOrdersAnalytics)



export default analyticsRouter