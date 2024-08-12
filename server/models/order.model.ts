
import mongoose, { Document, Model, Schema } from 'mongoose';


export interface IOrder extends Document {
    courseId: string,
    userId: string,
    instructorId: string,
    payment_info: Object,
}


const orderSchema = new Schema<IOrder>({
    courseId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    instructorId: {
        type: String,
        required: true
    },
    payment_info: {
        type: Object
        // required: true
    }
}, { timestamps: true });

const orderModel: Model<IOrder> = mongoose.model("Order", orderSchema)

export default orderModel