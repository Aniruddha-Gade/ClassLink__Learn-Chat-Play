import mongoose, { Document, Model, Schema } from 'mongoose'
import { IUser } from './user.model';




// interface
interface IComment extends Document {
    user: IUser,
    question: string,
    questionReplies?: IComment[]
}

interface IReview extends Document {
    user: IUser,
    rating: Number,
    comment: string,
    commentReplies?: IComment[]
}

interface ILink extends Document {
    title: string,
    url: string
}

interface ICourseData extends Document {
    title: string,
    description: string,
    videoUrl: string,
    videoThumbnail: Object,
    videoSection: string,
    videoLength: Number,
    videoPlayer: string,
    links: ILink[],
    suggestion: string,
    questions: IComment[]
}


interface ICourse extends Document {
    createdBy: mongoose.Schema.Types.ObjectId,
    title: string,
    description: string,
    price: Number,
    estimatedPrice?: Number,
    thumbnail: Object,
    tags: string,
    level: string,
    demoUrl: string,
    benefits: { title: string }[],
    prerequisites: { title: string }[],
    reviews: IReview[],
    courseData: ICourseData[],
    ratings?: Number,
    purchased?: Number,
    users: mongoose.Types.ObjectId[];
    isArchived: Boolean;
    archiveDate: Date | null;
}


// Review Schema
const reviewSchema = new Schema<IReview>({
    user: Object,
    rating: {
        type: Number,
        default: 0
    },
    comment: String,
    commentReplies: [Object]
})

// Link Schema
const linkSchema = new Schema<ILink>({
    title: String,
    url: String
})

// Comment Schema
const commentSchema = new Schema<IComment>({
    user: Object,
    question: String,
    questionReplies: [Object]
})


// Course Data Schema
const courseDataSchema = new Schema<ICourseData>({
    title: String,
    description: String,
    videoUrl: String,
    videoSection: String,
    videoLength: Number,
    videoPlayer: String,
    links: [linkSchema],
    suggestion: String,
    questions: [commentSchema]
})


// Course Schema ======= Main ======= 
const courseSchema = new Schema<ICourse>({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    estimatedPrice: {
        type: Number
    },
    thumbnail: {
        public_id: {
            type: String,
            // required: true
        },
        url: {
            type: String,
            // required: true
        }
    },
    tags: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true
    },
    demoUrl: {
        type: String,
        required: true
    },
    benefits: [{ title: String }],
    prerequisites: [{ title: String }],
    reviews: [reviewSchema],
    courseData: [courseDataSchema],
    ratings: {
        type: Number,
        default: 0
    },
    purchased: {
        type: Number,
        default: 0
    },
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    isArchived: {
        type: Boolean,
        default: false, // Indicates if the course is marked for deletion
    },
    archiveDate: {
        type: Date,
        default: null, // Stores the date when the course was marked for deletion
    },
}, { timestamps: true })


const CourseModel: Model<ICourse> = mongoose.model("Course", courseSchema)
export default CourseModel