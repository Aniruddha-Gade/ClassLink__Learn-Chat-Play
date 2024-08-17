import { NextFunction, Request, Response } from "express";
import userModel from "../models/user.model";
import { generateLast12MothsData } from "../utils/analytics.generator";
import { catchAsyncError } from "../utils/catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";







// =========================== UPDATE SPECIFIC NOTIFICATIONS ===========================
export const getUserAnalytics = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await generateLast12MothsData(userModel)


    return res.status(201).json({
      success: true,
      users,
      message: "All Users fetched successfully"
    })

  }
  catch (error) {
    return next(new ErrorHandler(error.message, 400, "Error while updating notification"));
  }
}
)