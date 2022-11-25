import { Router } from "express";
import asyncHandler from "../middlewares/asyncHandler";
import User, { DocumentResult } from "../models/User";
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
userRouter.delete(
    "/:id",
    asyncHandler(async (req, res, next) => {
        const { id } = req.params;
        const { userId, isAdmin } = req.body;
        console.log(id, userId);
        if (id === userId || isAdmin) {
            const isExist = await User.findByIdAndDelete(userId);
            if (!isExist) {
                res.status(400).json({
                    msg: "존재하지 않는 회원입니다.",
                });
            }
            res.status(200).json({
                msg: "탈퇴 완료되었습니다",
            });
        } else {
            res.status(401).json({
                msg: "허용되지 않는 접근",
            });
        }
    })
);

// get User
userRouter.get(
    "/:id",
    asyncHandler(async (req, res, next) => {
        const { id } = req.params;
        const user = await User.findById(id);
        const { updatedAt, ...others } = user!._doc;
        if (user) {
            res.status(200).json({
                msg: "유저를 찾았습니다",
                others,
            });
        } else {
            res.status(400).json({
                msg: "존재하지 않는 회원입니다.",
            });
        }
    })
);

// follow a User

// unfollow a User

export default userRouter;
