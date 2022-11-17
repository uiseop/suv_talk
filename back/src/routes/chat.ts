import { Request, Router } from "express";
import asyncHandler from "../middlewares/asyncHandler";
import isAuthenticated from "../middlewares/isAuthenticated";
import User from "../models/user";

const chatRouter = Router();

chatRouter.post(
    "/:id",
    isAuthenticated,
    asyncHandler(async (req: Request, res, next) => {
        const { id } = req.params;
        const me = req.user;
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(400).json({
                message: "존재하지 않는 회원입니다",
            });
        }
        const channels = await me!.getChannels({
            include: [
                {
                    model: User,
                    as: "Participants",
                    attributes: ["id"],
                },
            ],
        });
        console.log(channels.length);
        if (channels.length === 0) {
            const channel = await me?.createChannel({
                chatName: "따끈따끈한 채팅",
            });
            await channel?.addParticipant(user);
            return res.status(200).json({
                message: "새로운 채팅이 시작됩니다",
                chat: channel,
            });
        }
        return res.json({
            message: "hello world",
        });
    })
);

export default chatRouter;
