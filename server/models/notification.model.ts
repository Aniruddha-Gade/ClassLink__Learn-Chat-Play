import mongoose, { Document, Model, Schema } from 'mongoose';


export interface INotification extends Document {
    title: string;
    message: string;
    status: "unread" | "read";
    userId: string;
    instructorId: string;
}

const notificationSchema = new Schema<INotification>({
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["unread", "read"], // allowed values 
        default: "unread",
        required: true,
    },
    userId: {
        type: String,
        required: true
    },
    instructorId: {
        type: String,
        required: true
    },
}, { timestamps: true })


const notificationModel: Model<INotification> = mongoose.model("Notification", notificationSchema)

export default notificationModel
