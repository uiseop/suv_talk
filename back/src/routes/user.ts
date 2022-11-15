import { Request, Router } from "express";
import User from "../models/user";

const userRouter = Router();

userRouter.post("/join", async (req, res, next) => {
    try {
        const { uid }: { uid: string } = req.body;
        let user = await User.findOne({ where: { uid } });
        res.cookie("access-token", uid);
        if (user) {
            console.log(
                "이미 동일한 아이디가 존재합니다. 존재하는 아이디로 로그인을 합니다"
            );
            res.status(200).json({
                message: "기존 아이디로 로그인 되었습니다 확인점요",
                "access-token": user.uid,
                id: user.id,
            });
        } else {
            user = await User.create({ uid });
            console.log("새로운 아이디가 생성되었습니다");
            res.status(200).json({
                message: "새로운 아이디로 로그인 되었습니다 확인점요",
                "access-token": user.uid,
                id: user.id,
            });
        }
    } catch (err) {
        console.log(err);
        next(err);
    }
});

userRouter.get("/all", (req: Request, res, next) => {
    User.findAll()
        .then((response) => {
            res.status(200).json({
                users: response,
            });
        })
        .catch((err) => console.log("some thing wrong"));
});

export default userRouter;
