import { Request, Router } from "express";
import { Op, where } from "sequelize";
import isAuthenticated from "../middlewares/isAuthenticated";
import Chat from "../models/chat";
import User from "../models/user";

const chatRouter = Router();

chatRouter.post("/:id", isAuthenticated, (req: Request, res, next) => {
    const { id } = req.params;
    const user = req.user;
    user!.getChannels({
        include: [{
            model: User,
            as: 'Participants',
            attributes: ['id']
        }]
    })
        .then((channels) => {
            console.log(channels)
            if (channels.length > 0) {

            } else {
                
            }
        })
});

export default chatRouter;
