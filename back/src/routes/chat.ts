import { Request, Router } from "express";
import isAuthenticated from "../middlewares/isAuthenticated";
import Chat from "../models/chat";
import ChatItem from "../models/chat_item";
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
            res.status(400).json({
                message: "무엇이 잘못됨",
            });
        });
});

chatRouter.get("/:chatId", isAuthenticated, (req: Request, res, next) => {
    const { chatId } = req.params;
    const chat = req.chat as Chat;

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

    ChatItem.destroy({ where: { id: chatId } })
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

chatRouter.post("/:UserId/self", isAuthenticated, (req: Request, res, next) => {
    const { UserId } = req.params; // 다른 유저의 uid
    const { user, chat } = req;
    chat?.getChatItems()
        .then((chatItems) => {
            const curChat = chatItems.find(async (chatItem) => {
                const result = await chatItem.hasUser(user?.id as number);
                return result;
            });
            if (curChat) {
                res.status(200).json({
                    message: "기존의 채팅방으로 돌아갑니다",
                    chatItem: curChat,
                });
            } else {
                chat.createChatItem({ room_name: "나와의 채팅" }).then(
                    (chatItem) => {
                        chatItem.addUser(user).then(() =>
                            res.status(201).json({
                                message: "새로운 나와의 채팅이 시작됩니다",
                                chatItem,
                            })
                        );
                    }
                );
            }
        })
        .catch((err) => {
            next(err);
        });
});

chatRouter.post("/:UserId", isAuthenticated, (req: Request, res, next) => {
    const { UserId } = req.params;
    const { user, chat } = req;
    User.findOne({ where: { uid: UserId } }).then((chatUser) => {
        if (chatUser) {
            chat?.getChatItems().then((chatItems) => {
                let flag = false;
                console.log(`###########################
                HELOO
                ###########################
                `);
                console.log(chatItems);
                if (chatItems.length > 0) {
                    for (let chatItem of chatItems) {
                        console.log(chatItem, "hahahahahha");
                        chatItem
                            .getUsers()
                            .then((users) => {
                                console.log(users);
                                if (
                                    users.every(
                                        (u) => u.uid === UserId || user === u
                                    )
                                ) {
                                    flag = true;
                                    res.status(200).json({
                                        message: `${UserId}님과의 기존 채팅방으로 돌아갑니다`,
                                        chatItem,
                                    });
                                }
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    }
                } else if (!flag) {
                    chat?.createChatItem({
                        room_name: `${UserId}님과의 채팅`,
                    }).then((chatItem) => {
                        chatItem.getUsers().then((users) => {
                            console.log(users)
                            chatUser.getChat().then((chat) =>
                                chat.addChatItem(chatItem).then(() => {
                                    res.status(200).json({
                                        message: `${UserId}님과의 새로운 채팅방으로 돌아갑니다`,
                                        chatItem,
                                    });
                                })
                            );
                        })
                        // chatItem.addUser(chatUser).then(() => {
                        // });
                    });
                }
            });
        } else {
            return res.status(400).json({
                message: "존재하지 않는 유저",
            });
        }
    });
});

export default chatRouter;
