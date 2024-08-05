
import cloudinary from 'cloudinary';
import { catchAsyncError } from '../utils/catchAsyncError';
import { NextFunction, Request, Response } from 'express';
import ErrorHandler from '../utils/ErrorHandler';
import { createCourse } from '../services/course.service';


// =========================== UPLOAD COURSE ===========================
export const uploadCourse = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {

        // extract data 
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

        // create course in DB
        createCourse(data, res, next)

    } catch (error) {
        return next(new ErrorHandler(error.message, 400, "Error while creating course"));
    }
})