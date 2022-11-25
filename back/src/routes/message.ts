import { NextFunction, Request, Response, Router } from "express";
import { Op } from "sequelize";
import { Server } from "socket.io";
import io from "../../util/socket";
import asyncHandler from "../middlewares/asyncHandler";
import isAuthenticated from "../middlewares/isAuthenticated";
import Chat from "../models/chat";
import Message from "../models/message";
import User from "../models/user";

const messageRouter = Router();

messageRouter.get(
    "/:id",
    isAuthenticated,
    asyncHandler(async (req: Request, res, next) => {
        const { id } = req.params;
        const { lastIndex, limit } = req.query;
        const where = {
            ChatId: id,
            id: {
                [Op.gt]: Number(lastIndex),
            },
        };

        const me = req.user;
        const messages = await Message.findAll({
            where,
            order: [["createdAt", "DESC"]],
            limit: Number(limit),
        });
        return res.json({ messages });
    })
);

messageRouter.post(
    "/:id",
    isAuthenticated,
    asyncHandler(async (req: Request, res, next) => {
        const { id } = req.params;
        const { content } = req.body;
        const me = req.user;
        const newMessage = await Message.create({
            content,
            UserId: me!.id,
            ChatId: Number(id),
        });
        console.log(newMessage.content);

        const Io = io.getIo();

        const chat = await Chat.findByPk(id);
        console.log("Settign!!!!!!!!!!!!!!")
        console.log("Settign!!!!!!!!!!!!!!")
        await chat?.setLastMessage(newMessage);
        console.log("Settign!!!!!!!!!!!!!!")
        console.log("Settign!!!!!!!!!!!!!!")
        const user = await chat
            ?.getParticipants()
            .then((users) => users.find((user) => user.id !== me!.id));

        if (user) {
            {
                Io.to(user!.socketId as string).emit("receive", {
                    action: "addMessage",
                    message: newMessage,
                });
            }
        }

        res.json({
            message: newMessage,
        });
    })
);

export default messageRouter;
