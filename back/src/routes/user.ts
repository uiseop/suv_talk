import { Router } from "express";
import asyncHandler from "../middlewares/asyncHandler";
import User, { DocumentResult, IUser } from "../models/User";
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
    "/",
    asyncHandler(async (req, res, next) => {
        const { id, username } = req.query;
        let currentUser;
        if (id) {
            currentUser = await User.findById(id);
        } else {
            currentUser = await User.findOne({ username });
        }
        const { updatedAt, ...others } = currentUser!._doc;
        if (currentUser) {
            res.status(200).json({
                msg: "유저를 찾았습니다",
                user: others,
            });
        } else {
            res.status(400).json({
                msg: "존재하지 않는 회원입니다.",
            });
        }
    })
);

// follow a User
userRouter.put(
    "/:id/follow",
    asyncHandler(async (req, res, next) => {
        const { id } = req.params;
        const { userId } = req.body;
        console.log("heelo?");
        if (id === userId) {
            return res.status(403).json({
                msg: "자기 자신을 팔로우할 수 없습니다.",
            });
        }
        const followUser = await User.findById(id);
        const user = await User.findById(userId);
        const follows = user?.followings;
        if (!followUser) {
            return res.status(400).json({
                msg: "존재하지 않는 회원입니다",
            });
        } else if (follows?.find((uid) => uid === id)) {
            return res.status(403).json({
                msg: "이미 팔로우한 회원입니다.",
            });
        }
        await user!.updateOne({ $push: { followings: id } });
        await followUser!.updateOne({ $push: { followers: userId } });
        res.status(200).json({
            msg: "팔로우 성공",
        });
    })
);

// unfollow a User
userRouter.put(
    "/:id/unfollow",
    asyncHandler(async (req, res, next) => {
        const { id } = req.params;
        const { userId } = req.body;
        console.log("byebye");
        if (id === userId) {
            return res.status(403).json({
                msg: "자기 자신을 팔로우 취소할 수 없습니다",
            });
        }
        const followUser = await User.findById(id);
        const currentUser = await User.findById(userId);
        if (!currentUser?.followings.find((uid) => uid === id) || !followUser) {
            return res.status(403).json({
                msg: "해당 유저는 팔로우 목록에 없습니다",
            });
        }
        await currentUser!.updateOne({ $pull: { followings: id } });
        await followUser!.updateOne({ $pull: { followers: userId } });
        res.status(200).json({
            msg: "팔로우 취소 성공",
        });
    })
);

userRouter.get(
    "/friends/:userId",
    asyncHandler(async (req, res, next) => {
        try {
            const { userId } = req.params;
            const user = await User.findById(userId);
            const friends = await Promise.all(
                user!.followings.map((friendId) => {
                    return User.findById(friendId);
                })
            );
            let friendList = friends.map((friend) => {
                const { id, username, profileImage } = friend as IUser;
                return { id, username, profileImage };
            });
            res.status(200).json({
                msg: "유저 팔로잉 목록 가져오기 성공",
                friendList,
            });
        } catch (error) {
            res.status(500).json(error);
        }
    })
);

export default userRouter;
