import { Request, Router } from "express";
import isAuthenticated from "../middlewares/isAuthenticated";
import Chat from "../models/chat";
import User from "../models/user";

const chatRouter = Router();

chatRouter.post("/", isAuthenticated, async (req: Request, res, next) => {
    const { room_name } = req.body;
    const user = req.user as User;
    try {
        const chat = await user.getChat();
        if (chat) {
            // 해당 유저가 만든 채팅방들이 있지
            // 다른 사람이 만든 방에 초대된 경우는 ?
            chat.createChatItem({ room_name })
                .then((chatItem) => {
                    res.status(201).json({
                        message: "채팅방이 생성되었습니다",
                        chatItem,
                    });
                })
                .catch((err) => {
                    console.log(err);
                    res.status(400).json({
                        err,
                        message: "무언가 잘못됐다!!",
                    });
                });
        } else {
            user.createChat()
                .then((chat) => {
                    chat.createChatItem({ room_name }).then((chatItem) => {
                        res.status(201).json({
                            message: "채팅방이 생성되었습니다",
                            chatItem,
                        });
                    });
                })
                .catch((err) => {
                    console.log(err);
                    res.status(400).json({
                        err,
                        message: "무언가 잘못됐다!!",
                    });
                });
        }
    } catch (err) {
        next(err);
    }
});

chatRouter.get("/", isAuthenticated, (req: Request, res, next) => {
    const chat = req.chat as Chat;
    chat.getChatItems()
        .then((response) => {
            res.status(200).json({
                message: "채팅방 조회가 완료되엇씁니다",
                response,
            });
        })
        .catch((err) => {
            console.log("ㅜㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠ");
            res.status(400).json({
                message: "무엇이 잘못됨",
            });
        });
});

chatRouter.get("/:chatId", isAuthenticated, (req: Request, res, next) => {
    const { chatId } = req.params;
    const chat = req.chat as Chat;
    console.log(chatId)

    chat.getChatItems({ where: { id: chatId } })
        .then((chat) => {
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

chatRouter.post("/:UserId", isAuthenticated, (req: Request, res, next) => {
    const { UserId } = req.params;
    Chat.findAll({ where: { UserId } }).then((chats) => {});
});

export default chatRouter;
