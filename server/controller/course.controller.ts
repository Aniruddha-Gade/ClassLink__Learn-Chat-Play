
import cloudinary from 'cloudinary';
import { catchAsyncError } from '../utils/catchAsyncError';
import { NextFunction, Request, Response } from 'express';
import ErrorHandler from '../utils/ErrorHandler';
import { createCourse } from '../services/course.service';
import CourseModel from '../models/course.model';
import { redis } from './../utils/redis';


// =========================== UPLOAD COURSE ===========================
export const uploadCourse = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {

        // extract data 
        const createdBy = req.user._id
        const data = req.body;
        const thumbnail = data.thumbnail

        if (thumbnail) {
            const uploadedUrl = await cloudinary.v2.uploader.upload(thumbnail, {
                folder: "ClassLink/courses",
            })

            // store urls 
            data.thumbnail = {
                public_id: uploadedUrl.public_id,
                url: uploadedUrl.secure_url,
            }
        }

        data.createdBy = createdBy;
        // create course in DB
        createCourse(data, res, next)

    } catch (error) {
        return next(new ErrorHandler(error.message, 400, "Error while creating course"));
    }
})




// =========================== UPLOAD COURSE ===========================
export const editCourse = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {

        // extract data 
        const data = req.body;
        const thumbnail = data.thumbnail

        // user ID
        const createdBy = req.user._id
        // get course ID
        const courseId = req.params.id


        // delete previous thumbnail and upload new one
        if (thumbnail) {
            await cloudinary.v2.uploader.destroy(thumbnail.public_id)
            const uploadedUrl = await cloudinary.v2.uploader.upload(thumbnail, {
                folder: "ClassLink/courses",
            })

            // store urls 
            data.thumbnail = {
                public_id: uploadedUrl.public_id,
                url: uploadedUrl.secure_url,
            }
        }

        // update course in DB
        const updatedCourse = await CourseModel.findOneAndUpdate(
            { _id: courseId, createdBy: createdBy },
            {
                $set: data,
            },
            { new: true }
        )

        if (!updatedCourse) {
            return next(new ErrorHandler("Course could not be found or you are not authorized to edit this course", 400, "Error while creating course"));
        }

        // return response
        res.status(201).json({
            success: true,
            updatedCourse,
            message: "Course updated successfully"
        })

    } catch (error) {
        return next(new ErrorHandler(error.message, 400, "Error while creating course"));
    }
})




// =========================== GET SINGLE COURSE ( WITHOUT PURCHASING ) ===========================
export const getSingleCourse = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {

        const courseId = req.params.id

        const isCacheExist = await redis.get(courseId)   // check Is data available in redis 
        if (isCacheExist) {
            const course = JSON.parse(isCacheExist)

            // console.log("Hitting Redis")
            // return response
            res.status(201).json({
                success: true,
                course,
                message: "Course found successfully"
            })
        }

        else {
            // get course ID
            const course = await CourseModel.findById(courseId)
                .select("-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links")

            if (!course) {
                return next(new ErrorHandler("Course could not be found course", 400, "Error while fetching course"));
            }

            // store in redis
            await redis.set(courseId, JSON.stringify(course))

            // console.log("Hitting MongoDB")
            // return response
            res.status(201).json({
                success: true,
                course,
                message: "Course found successfully"
            })
        }

    } catch (error) {
        return next(new ErrorHandler(error.message, 400, "Error while fetching course"));
    }
})




// =========================== GET ALL COURSE ( WITHOUT PURCHASING ) ===========================
export const getAllCourse = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {

        // check Is all courses data available in redis 
        const isCacheExist = await redis.get("allCourses")

        if (isCacheExist) {
            const courses = JSON.parse(isCacheExist);

            // console.log("Hitting Redis")
            // return response
            res.status(201).json({
                success: true,
                courses,
                message: "All Courses data found successfully"
            })
        }

        else {
            const courses = await CourseModel.find()
                .select("-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links")

            if (!courses) {
                return next(new ErrorHandler("Course could not be found all courses", 400, "Error while fetching courses"));
            }

            // store in redis
            await redis.set("allCourses", JSON.stringify(courses));

            // console.log("Hitting MongoDB")
            // return response
            res.status(201).json({
                success: true,
                courses,
                message: "All Courses found successfully"
            })
        }

    } catch (error) {
        return next(new ErrorHandler(error.message, 400, "Error while fetching courses"));
    }
})


