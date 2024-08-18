import { Router } from "express"
import { isAdmin, isAuthenticated } from "../middleware/auth"
import { createLayout, updateLayout } from "../controller/layout.controller"

const layoutRouter = Router()


layoutRouter.post('/create-layout', isAuthenticated, isAdmin, createLayout)
layoutRouter.put('/update-layout', isAuthenticated, isAdmin, updateLayout)


export default layoutRouter