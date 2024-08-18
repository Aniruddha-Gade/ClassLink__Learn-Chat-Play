import { NextFunction, Request, Response } from "express";
import { catchAsyncError } from "../utils/catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import cloudinary from 'cloudinary'
import LayoutModel from "../models/layout.model";


// =========================== CREATE LAYOUT - ONLY FOR ADMIN ===========================
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




// =========================== UPDATE LAYOUT - ONLY FOR ADMIN ===========================
export const updateLayout = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { type } = req.body;
        if (!type) {
            return next(new ErrorHandler('type required', 404, "Error while editing layout"));
        }

        
        // Banner
        if (type === "Banner") {
            const bannerData: any = await LayoutModel.findOne({ type: "Banner" });
            if (!bannerData) {
                return next(new ErrorHandler('Banner data not found', 404, "Error while editing layout"));
            }

            const { image, title, subTitle } = req.body;
            await cloudinary.v2.uploader.destroy(bannerData.image.public_id); // delete img from cloudinary
            const myCloud = await cloudinary.v2.uploader.upload(image, {
                folder: "ClassLink/layouts",
            });
            const banner = {
                type: "Banner",
                image: {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url,
                },
                title,
                subTitle,
            };
            await LayoutModel.findByIdAndUpdate(bannerData._id, { banner });
        }

        // FAQ
        if (type === "FAQ") {
            const { faq } = req.body;
            const faqItems = await LayoutModel.findOne({ type: "FAQ" })
            if (!faqItems) {
                return next(new ErrorHandler('Faq data not found', 404, "Error while editing layout"));
            }
            // update FAQ data 
            await LayoutModel.findByIdAndUpdate(faqItems._id, { faq });
        }


        // Categories
        if (type === "Categories") {
            const { categories } = req.body;
            const categoriesData = await LayoutModel.findOne({ type: "Categories", });
            if (!categoriesData) {
                return next(new ErrorHandler('Categories data not found', 404, "Error while editing layout"));
            }
            // update categories data
            await LayoutModel.findByIdAndUpdate(categoriesData?._id, { categories });
        }

        // send success response
        res.status(200).json({
            success: true,
            message: "Layout Updated successfully",
        });
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400, "Error while editing layout"));
    }
});
