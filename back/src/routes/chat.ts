import { Request, Router } from "express";
import isAuthenticated from "../middlewares/isAuthenticated";
import Chat from "../models/chat";

const chatRouter = Router();

chatRouter.post("/", isAuthenticated, (req: Request, res, next) => {
    console.log(req.body);
    const { room_name, user } = req.body;
    Chat.create({ room_name })
        .then((response) => {
            response;
            res.status(201).json({
                message: "채팅방이 생성되었습니다",
                response,
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json({ message: "무언가 잘못됐다." });
        });
});

chatRouter.get("/", (req: Request, res, next) => {
    console.log(req.body);
    Chat.findAll()
        .then((response) => {
            console.log(response);
            res.status(200).json({
                message: "채팅방 조회가 완료되엇씁니다",
                response,
            });
        })
        .catch((err) => {
            res.status(400).json({
                message: "무엇이 잘못됨",
            });
        });
});

chatRouter.get("/:chatId", isAuthenticated, (req: Request, res, next) => {
    const { chatId } = req.params;

    Chat.findOne({ where: { room_name: chatId } })
        .then((response) => {
            console.log(response);
            res.status(200).json({
                message: "조회 완료",
                response,
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json({ message: "something wrong" });
        });
});

export default chatRouter;
