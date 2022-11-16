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
            res.status(500).json({
                message: "서버 일시적 오류",
            });
        });
});

export default userRouter;
