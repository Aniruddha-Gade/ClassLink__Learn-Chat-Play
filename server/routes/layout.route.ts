import { Router } from "express"
import { isAdmin, isAuthenticated } from "../middleware/auth"
import { createLayout } from "../controller/layout.controller"

const layoutRouter = Router()


layoutRouter.post('/create-layout', isAuthenticated, isAdmin, createLayout)


export default layoutRouter