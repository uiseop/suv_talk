import { Router } from "express";
import User from "../models/user";

const userRouter = Router();

userRouter.post("/join", async (req, res, next) => {
    const { uid } = req.body;
    let user = await User.findOne({ where: { uid } });
    if (user) {
        console.log(
            "이미 동일한 아이디가 존재합니다. 존재하는 아이디로 로그인을 합니다"
        );
        res.cookie("access-token", user.id).json({
            message: "기존 아이디로 로그인 되었습니다 확인점요",
        });
    } else {
        user = await User.create({ uid });
        console.log("새로운 아이디가 생성되었습니다");
        res.cookie("access-token", user.uid).json({
            message: "새로운 아이디로 로그인 되었습니다 확인점요",
        });
    }
});

userRouter.get("/", (req, res, next) => {
    res.send(
        '<form action="/user/join" method="POST"><div class="form-control"><label for="uid">uid</label><input type="text" name="uid" id="uid"></div><button class="btn" type="submit">Add Product</button></form> '
    );
});

export default userRouter;
