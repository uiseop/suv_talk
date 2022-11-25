import { Router } from "express";
import asyncHandler from "../middlewares/asyncHandler";
import User from "../models/User";
const userRouter = Router();

userRouter.post(
    "/signin",
    asyncHandler(async (req, res, next) => {
        const { username } = req.body;
        const isExist = await User.findOne({ username });
        if (isExist) {
            res.status(200).json({
                msg: "기존 가입된 아이디로 로그인",
                user: isExist,
            });
        } else {
            const user = new User({
                username,
            });
            await user.save();
            res.status(201).json({
                msg: "새로운 아이디 생성",
                user,
            });
        }
        res.json();
    })
);

// update User
userRouter.put(
    "/:id",
    asyncHandler(async (req, res, next) => {
        const { id } = req.params;
        const { userId } = req.body;
        if (id === userId) {
            const user = await User.findByIdAndUpdate(userId, {
                $set: req.body,
            });
            res.status(200).json({
                msg: "정보가 수정되었습니다",
                user,
            });
        } else {
            res.status(401).json({
                msg: "허용되지 않는 접근",
            });
        }
    })
);

// delete User

// get User

// follow a User

// unfollow a User

export default userRouter;
