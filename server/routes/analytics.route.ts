import { Router } from "express"
import { isAdmin, isAuthenticated } from "../middleware/auth"
import { getUserAnalytics } from "../controller/analytics.controller"

const analyticsRouter = Router()


analyticsRouter.get('/get-users-analytics', isAuthenticated, isAdmin,  getUserAnalytics)



export default analyticsRouter