import { Router } from "express"
import { isAdmin, isAuthenticated } from "../middleware/auth"
import { createLayout, getLayoutByType, updateLayout } from "../controller/layout.controller"
import { updateAccessToken } from "../controller/user.controller"

const layoutRouter = Router()


layoutRouter.post('/create-layout', updateAccessToken, isAuthenticated, isAdmin, createLayout)
layoutRouter.put('/update-layout', updateAccessToken, isAuthenticated, isAdmin, updateLayout)
layoutRouter.get('/get-layout/:type', updateAccessToken, isAuthenticated, isAdmin, getLayoutByType)


export default layoutRouter