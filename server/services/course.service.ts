import { Response } from "express";
import { catchAsyncError } from "../utils/catchAsyncError";
import CourseModel from './../models/course.model';


// =========================== CREATE COURSE ===========================
export const createCourse = catchAsyncError(async (data: any, res: Response) => {
    const course = await CourseModel.create(data)
    res.status(201).json({
        success: true,
        course,
        message: "Course created successfully"
    })
})