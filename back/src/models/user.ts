import { Document, model, Schema } from "mongoose";

export interface DocumentResult<T> extends Document {
    _doc: T;
}

export interface IUser extends DocumentResult<IUser> {
    id: string;
    username: string;
    desc: string;
    profileImage: string;
    coverImage: string;
    followers: string[];
    followings: string[];
    isAdmin: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new Schema(
    {
        username: {
            type: String,
            require: true,
        },
        desc: {
            type: String,
            max: 50,
        },
        profileImage: {
            type: String,
            default: "",
        },
        coverImage: {
            type: String,
            default: "",
        },
        followers: {
            type: Array,
            default: [],
        },
        followings: {
            type: Array,
            default: [],
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

export default model<IUser>("User", UserSchema);
