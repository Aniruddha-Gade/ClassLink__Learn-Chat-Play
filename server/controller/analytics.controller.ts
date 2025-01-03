import { NextFunction, Request, Response } from "express";
import userModel from "../models/user.model";
import { generateLast12MothsData } from "../utils/analytics.generator";
import { catchAsyncError } from "../utils/catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import CourseModel from "../models/course.model";
import orderModel from "../models/order.model";







// =========================== GET USER ANALYTICS - ONLY FOR ADMIN ===========================
export const getUserAnalytics = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await generateLast12MothsData(userModel)


    return res.status(201).json({
      success: true,
      users,
      message: "All Users fetched successfully"
    })

  }
  catch (error: any) {
    return next(new ErrorHandler(error.message, 400, "Error while updating notification"));
  }
}
)




// =========================== GET COURSE ANALYTICS - ONLY FOR ADMIN ===========================
export const getCourseAnalytics = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const courses = await generateLast12MothsData(CourseModel)


    return res.status(201).json({
      success: true,
      courses,
      message: "All Users fetched successfully"
    })

  }
  catch (error: any) {
    return next(new ErrorHandler(error.message, 400, "Error while updating notification"));
  }
}
)




// =========================== GET COURSE ANALYTICS - ONLY FOR ADMIN ===========================
export const getOrdersAnalytics = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orders = await generateLast12MothsData(orderModel)


    return res.status(201).json({
      success: true,
      orders,
      message: "All orders fetched successfully"
    })

  }
  catch (error: any) {
    return next(new ErrorHandler(error.message, 400, "Error while updating notification"));
  }
}
)