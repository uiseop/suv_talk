import { Request, Router } from "express";
import { Chat } from "../models";
import User from "../models/user";

const userRouter = Router();

userRouter.post("/join", async (req, res, next) => {
    try {
        const { uid } = req.body;
        let user = await User.findOne({ where: { uid } });
        if (user) {
            console.log(
                "이미 동일한 아이디가 존재합니다. 존재하는 아이디로 로그인을 합니다"
            );
            res.status(200).json({
                message: "기존 아이디로 로그인 되었습니다 확인점요",
                "access-token": user.uid,
            });
        } else {
            user = await User.create({ uid });
            console.log("새로운 아이디가 생성되었습니다");
            res.status(200).json({
                message: "새로운 아이디로 로그인 되었습니다 확인점요",
                "access-token": user.uid,
            });
        }
    } catch (err) {
        console.log(err);
        next(err);
    }
});

userRouter.get("/", (req: Request, res, next) => {
    console.log(req.isAuthenticated);
    if (req.isAuthenticated) {
        return res.redirect("/");
    }
    res.send(
        '<form action="/user/join" method="POST"><div class="form-control"><label for="uid">uid</label><input type="text" name="uid" id="uid"></div><button class="btn" type="submit">Add Product</button></form> '
    );
});

userRouter.get("/all", (req: Request, res, next) => {
    console.log(req.isAuthenticated);
    if (req.isAuthenticated) {
        User.findAll()
            .then((response) => {
                res.status(200).json({
                    users: response,
                });
            })
            .catch((err) => console.log("some thing wrong"));
    } else {
        return res
            .status(401)
            .json({ message: "You don't have authentication" });
    }
});



export default userRouter;
