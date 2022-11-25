import { model, Schema } from "mongoose";

const UserSchema = new Schema(
    {
        username: {
            type: String,
            require: true,
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
    },
    { timestamps: true }
);

export default model("User", UserSchema);
