import mongoose, { Document, Model, Schema } from 'mongoose'




// interface
interface IComment extends Document {
    user: Object,
    comment: string,
    commentReplies?: IComment[]
}

interface IReview extends Document {
    user: Object,
    rating: Number,
    comment: string,
    commentReplies: IComment[]
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
    purchased?: Number
}


// Review Schema
const reviewSchema = new Schema<IReview>({
    user: Object,
    rating: {
        type: Number,
        default: 0
    },
    comment: String
})

// Link Schema
const linkSchema = new Schema<ILink>({
    title: String,
    url: String
})

// Comment Schema
const commentSchema = new Schema<IComment>({
    user: Object,
    comment: String,
    commentReplies: [Object]
})


// Course Data Schema
const courseDataSchema = new Schema<ICourseData>({
    title: String,
    description: String,
    videoUrl: String,
    videoThumbnail: Object,
    videoSection: String,
    videoLength: Number,
    videoPlayer: String,
    links: [linkSchema],
    suggestion: String,
    questions: [commentSchema]
})


// Course Schema ======= Main ======= 
const courseSchema = new Schema<ICourse>({
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
            required: true
        },
        url: {
            type: String,
            required: true
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
    }
})


const CourseModel: Model<ICourse> = mongoose.model("Course", courseSchema)
export default CourseModel