import { Document, model, Schema } from "mongoose";

export interface DocumentResult<T> extends Document {
    _doc: T;
}

interface IPost extends DocumentResult<IPost> {
    id: string;
    userId: string;
    desc: string;
    images: string[];
    likes: string[];
}

const PostSchema = new Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        desc: {
            type: String,
            required: true,
        },
        images: {
            type: Array,
            default: [],
        },
        likes: {
            type: Array,
            default: [],
        },
    },
    { timestamps: true }
);

export default model<IPost>("Post", PostSchema);
