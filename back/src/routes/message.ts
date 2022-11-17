import { NextFunction, Request, Response, Router } from "express";
import asyncHandler from "../middlewares/asyncHandler";
import isAuthenticated from "../middlewares/isAuthenticated";
import Message from "../models/message";

const messageRouter = Router();

messageRouter.get(
    "/:id",
    isAuthenticated,
    asyncHandler(async (req: Request, res, next) => {
        const { id } = req.params;
        const me = req.user;
        const channel = await me?.getChannels({ where: { id } });
        console.log(channel);
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
        console.log(newMessage);
        res.json({
            message: newMessage,
        });
    })
);

export default messageRouter;
