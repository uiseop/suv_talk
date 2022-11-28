import { Router } from "express";
import asyncHandler from "../middlewares/asyncHandler";
import Post from "../models/Post";
import User from "../models/User";

const postRouter = Router();

// create post
postRouter.post(
    "/",
    asyncHandler(async (req, res, next) => {
        const newPost = new Post(req.body);
        const savedPost = await newPost.save();
        return res.status(200).json({
            msg: "새 포스트가 등록되었습니다",
            post: savedPost,
        });
    })
);

// update post
postRouter.put(
    "/:id",
    asyncHandler(async (req, res, next) => {
        const { id } = req.params;
        const { userId, isAdmin } = req.body;
        const post = await Post.findById(id);
        if (post?.userId !== userId && !isAdmin) {
            return res.status(401).json({
                msg: "변경 권한이 없습니다",
            });
        }
        await post?.updateOne({ $set: req.body });
        res.status(200).json({
            msg: "포스트가 변경되었습니다",
        });
    })
);

// delete post
postRouter.delete(
    "/:id",
    asyncHandler(async (req, res, next) => {
        const { id } = req.params;
        const { userId, isAdmin } = req.body;
        const post = await Post.findById(id);
        if (post?.userId !== userId && !isAdmin) {
            return res.status(401).json({
                msg: "변경 권한이 없습니다",
            });
        }
        await post?.delete();
        res.status(200).json({
            msg: "포스트가 삭제되었습니다",
        });
    })
);

// like post
postRouter.put(
    "/:id/like",
    asyncHandler(async (req, res, next) => {
        const { id } = req.params;
        const { userId } = req.body;
        const post = await Post.findById(id);
        if (post?.likes.includes(userId)) {
            await post?.updateOne({ $pull: { likes: userId } });
            return res.status(200).json({
                msg: "좋아요를 취소했습니다.",
            });
        }
        const user = await User.findById(userId);
        await post?.updateOne({ $push: { likes: userId } });
        res.status(200).json({
            msg: "포스트에 좋아요를 추가했습니다.",
        });
    })
);

// get post
postRouter.get(
    "/:id",
    asyncHandler(async (req, res, next) => {
        const { id } = req.params;
        const { userId } = req.body;
        const post = await Post.findById(id);
        res.status(200).json({
            msg: "게시물 조회 성공!",
            post,
        });
    })
);

// get all posts -> pagination by timeline
postRouter.get(
    "/timeline/all",
    asyncHandler(async (req, res, next) => {
        const { limit = 10, lastIndex = 0, userId } = req.query;
        const currentUser = await User.findById(userId);
        
        console.log(req.query)
        const posts = await Post.find({
            userId: [userId, ...currentUser!.followings],
        })
            .sort({ createdAt: "desc" })
            .skip(Number(lastIndex))
            .limit(Number(limit));

        res.status(200).json({
            msg: "전체 게시물 조회 성공!",
            posts,
        });
    })
);

// get userId's posts
postRouter.get(
    "/timeline/:userId",
    asyncHandler(async (req, res, next) => {
        const { limit = 10, lastIndex = 0, userId } = req.query;
        const currentUser = await User.findById(userId);
        const posts = await Post.find({
            userId,
        })
            .sort({ createdAt: "desc" })
            .skip(Number(lastIndex))
            .limit(Number(limit));
        res.status(200).json({
            msg: "유저 게시물 조회 성공!",
            posts,
        });
    })
);

export default postRouter;
