import { Router } from "express";
import asyncHandler from "../middlewares/asyncHandler";
import User from "../models/User";
const userRouter = Router();

userRouter.get(
    "/register",
    asyncHandler(async (req, res, next) => {
        const user = await new User({
            username: "seop",
            profileImage:
                "https://mongoosejs.com/docs/jobs#62c288992e788eb5404ba57d",
        });
        
        await user.save()
        res.json()
    })
);

export default userRouter;
