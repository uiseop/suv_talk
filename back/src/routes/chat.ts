import { Request, Router } from "express";
import { Op, where } from "sequelize";
import isAuthenticated from "../middlewares/isAuthenticated";
import Chat from "../models/chat";
import ChatItem from "../models/chat_user";
import User from "../models/user";

const chatRouter = Router();

chatRouter.post("/:id", isAuthenticated, (req: Request, res, next) => {
    const { id } = req.params;
    const user = req.user as User;
    user.getChats({ through: {} }).then((chats) => {});
    // ChatItem.findOne({
    //     where: {
    //         [Op.or]: [
    //             { userId: user.id, receiveUserId: id },
    //             { userId: id, receiveUserId: user.id },
    //         ],
    //     },
    // })
    //     .then((chatItem) => {
    //         if (chatItem) {
    //             return chatItem.getChats();
    //         } else {
    //             return user.createChat(
    //                 { chatName: "새로운 채팅" },
    //                 { through: { receiveUserId: id } }
    //             );
    //         }
    //     })
    //     .then((chat) => {
    //         res.status(200).json({
    //             message: "채팅 고고",
    //             chat,
    //         });
    //     })
    //     .catch((err) => next(err));
});

export default chatRouter;
