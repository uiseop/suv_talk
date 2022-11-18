import { Request, Router } from "express";
import User from "../models/user";

const userRouter = Router();

userRouter.post("/join", (req: Request, res, next) => {
    if (req.user) {
        return res.status(301).json({ message: "이미 로그인 되어있음" });
    }
    const { nickname } = req.body;
    if (!nickname) {
        return res.status(400).json({ message: "옳바르지 않는 요청" });
    }
    User.findOne({ where: { nickname } })
        .then((user) => {
            if (user) {
                res.cookie("id", user.id);
                res.cookie("access-token", user.nickname);
                return res.status(200).json({
                    "access-token": user.nickname,
                    id: user.id,
                });
            } else {
                User.create({ nickname }).then((user) => {
                    res.cookie("id", user.id);
                    res.cookie("access-token", user.nickname);
                    return res.status(200).json({
                        "access-token": user.nickname,
                        id: user.id,
                    });
                });
            }
        })
        .catch((err) => {
            console.log(err);
            next(err);
        });
});

userRouter.get("/all", (req: Request, res, next) => {
    User.findAll()
        .then((users) => {
            res.status(200).json({
                message: "유저 조회 완료!",
                users,
            });
        })
        .catch((err) => {
            next(err);
        });
});

userRouter.get("/chats", (req: Request, res, next) => {
    const user = req.user;
    user!.getChannels().then((channels) => {
        res.json({
            chatItems: channels,
        });
    });
});

userRouter.delete("/", (req: Request, res, next) => {
    res.cookie("access-token", "", { maxAge: 0 });
    res.cookie("id", "", { maxAge: 0 });
    res.json({
        message: "로그아웃 완료",
    });
});

export default userRouter;
