import { Router } from "express"
import { isAdmin, isAuthenticated } from "../middleware/auth"
import { getCourseAnalytics, getOrdersAnalytics, getUserAnalytics } from "../controller/analytics.controller"
import { updateAccessToken } from "../controller/user.controller"

const analyticsRouter = Router()


analyticsRouter.get('/get-users-analytics', updateAccessToken, isAuthenticated, getUserAnalytics)
analyticsRouter.get('/get-courses-analytics', updateAccessToken, isAuthenticated, getCourseAnalytics)
analyticsRouter.get('/get-orders-analytics', updateAccessToken, isAuthenticated, getOrdersAnalytics)



export default analyticsRouter