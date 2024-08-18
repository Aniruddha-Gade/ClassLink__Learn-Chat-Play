import mongoose, { Document, Model, Schema } from 'mongoose';


interface faqItem extends Document {
    question: string;
    answer: string;
}

interface category extends Document {
    title: string;
}

interface BannerImage extends Document {
    public_id: string;
    url: string;
}


interface Layout extends Document {
    type: string;
    faq: faqItem[];
    categories: category[];
    banner: {
        image: BannerImage;
        title: string;
        subTitle: string;
    }
}


const faqSchema = new Schema<faqItem>({
    question: { type: String },
    answer: { type: String },
})

const categorySchema = new Schema<category>({
    title: { type: String },
})

const BannerImageSchema = new Schema<BannerImage>({
    public_id: { type: String },
    url: { type: String },

})


const LayoutSchema = new Schema<Layout>({
    type: { type: String },
    faq: [faqSchema],
    categories: [categorySchema],
    banner: {
        image: BannerImageSchema,
        title: { type: String },
        subTitle: { type: String },
    }

})





const LayoutModel: Model<Layout> = mongoose.model("Layout", LayoutSchema)

export default LayoutModel