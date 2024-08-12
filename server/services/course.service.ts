import { Request, Response } from "express";
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




// =========================== GET ALL COURSES ===========================
export const getAllCourseService = async (req: Request, res: Response) => {

    const instructorId = req.user._id

    const allCourses = await CourseModel.find({
        createdBy: instructorId // get only instructor build courses
    }).sort({ createdAt: -1 })

    res.status(201).json({
        success: true,
        allCourses,
        message: "All courses fetched successfully"
    })

}