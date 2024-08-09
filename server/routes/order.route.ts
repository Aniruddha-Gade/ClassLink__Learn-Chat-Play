import { Router } from "express"
import { isAuthenticated, isStudent } from "../middleware/auth"
import { createOrder } from "../controller/order.controller"

const orderRouter = Router()

// only for student
orderRouter.post('/create-order', isAuthenticated, isStudent, createOrder)



export default orderRouter
