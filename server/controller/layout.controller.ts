import { NextFunction, Request, Response } from "express";
import { catchAsyncError } from "../utils/catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import cloudinary from 'cloudinary'
import LayoutModel from "../models/layout.model";


// =========================== GET USER ANALYTICS - ONLY FOR ADMIN ===========================
export const createLayout = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { type } = req.body;
        if (!type) {
            return next(new ErrorHandler('type required', 404, "Error while creating layout"));
        }

        // if type already exist then return error
        const isTypeExist = await LayoutModel.findOne({ type })
        if (isTypeExist) {
            return next(new ErrorHandler(`${type} already exist`, 404, "Error while creating layout"));
        }

        if (type === 'Banner') {
            const { image, title, subTitle } = req.body;
            const uploadedUrl = await cloudinary.v2.uploader.upload(image, {
                folder: "ClassLink/layouts",
            })

            // store data in banner
            const banner = {
                image: {
                    public_id: uploadedUrl.public_id,
                    url: uploadedUrl.secure_url,
                },
                title,
                subTitle
            }

            await LayoutModel.create({ type, banner })
        }


        if (type === 'FAQ') {
            const { faq } = req.body;
            await LayoutModel.create({ type, faq, })
        }

        if (type === 'Categories') {
            const { categories } = req.body;
            await LayoutModel.create({ type, categories, })
        }

        return res.status(201).json({
            success: true,
            message: "Layout created successfully"
        })

    }
    catch (error) {
        return next(new ErrorHandler(error.message, 400, "Error while creating layout"));
    }
}
)