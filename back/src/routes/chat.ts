import { Request, Router } from "express";
import isAuthenticated from "../middlewares/isAuthenticated";
import Chat from "../models/chat";
import User from "../models/user";

const chatRouter = Router();

chatRouter.post("/", isAuthenticated, (req: Request, res, next) => {
    console.log(req.body, "1234");
    const { room_name } = req.body;
    const user = req.user;
    try {
        (user as User)
            .createChat({ room_name })
            .then((chat) => {
                console.log(chat);
                chat.createChatItem().then((chatItem) =>
                    res.status(201).json({
                        message: "채팅방이 생성되었습니다",
                        chat,
                    })
                );
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json({ err, message: "무언가 잘못됐다." });
            });
    } catch (err) {
        console.log(err, " this is what i wnat");
        res.status(400).json({
            err,
        });
    }
});

chatRouter.get("/", (req: Request, res, next) => {
    Chat.findAll({ where: { UserId: req.user?.id } })
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

    Chat.findOne({ where: { id: chatId } })
        .then((chat) => {
            console.log(chat);
            res.status(200).json({
                message: `채팅번호 ${chatId} 조회 완료`,
                chat,
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json({ message: "something wrong" });
        });
});

chatRouter.delete("/:chatId", isAuthenticated, (req: Request, res, next) => {
    const { chatId } = req.params;

    Chat.destroy({ where: { id: chatId } })
        .then((response) =>
            res.status(200).json({
                response,
                message: "삭제 완료",
            })
        )
        .catch((err) =>
            res.status(400).json({
                err,
                message: "삭제 오류 발생",
            })
        );
});

export default chatRouter;
