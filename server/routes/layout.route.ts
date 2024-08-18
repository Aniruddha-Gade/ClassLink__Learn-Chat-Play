import { Router } from "express"
import { isAdmin, isAuthenticated } from "../middleware/auth"
import { createLayout, getLayoutByType, updateLayout } from "../controller/layout.controller"

const layoutRouter = Router()


layoutRouter.post('/create-layout', isAuthenticated, isAdmin, createLayout)
layoutRouter.put('/update-layout', isAuthenticated, isAdmin, updateLayout)
layoutRouter.get('/get-layout/:type', getLayoutByType)


export default layoutRouter