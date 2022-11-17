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

        if (channels.length > 0) {
            const users = Array.from(new Set([me!.id, user.id])).sort(
                (a, b) => a - b
            );
            for (let channel of channels) {
                if (channel.Participants?.length !== users.length) continue;
                const channel_users = channel.Participants?.map(
                    (user) => user.id
                ).sort((a, b) => a - b);
                if (JSON.stringify(users) === JSON.stringify(channel_users)) {
                    return res.json({
                        message: "기존 채팅 찾음ㅋ",
                        chat: channel,
                    });
                }
            }
        }
        const channel = await me?.createChannel({
            chatName: `${me.nickname}이 만든 채팅`,
        });
        await channel?.addParticipant(user);
        return res.status(200).json({
            message: "새로운 채팅이 시작됩니다",
            chat: channel,
        });
    })
);

export default chatRouter;
