import { NextFunction, Request, Response, Router } from "express";
import isAuthenticated from "../middlewares/isAuthenticated";
import ChatItem from "../models/chat_item";

const messageRouter = Router();

messageRouter.post(
    "/:chatId",
    isAuthenticated,
    (req: Request, res: Response, next: NextFunction) => {
        const { chatId } = req.params;
        const { user, chat } = req;
        chat?.getChatItems({ where: { id: chatId } })
            .then((chatItem) => {
                user?.createMessage({ message: req.body.message }).then(
                    (message) => {
                        chatItem[0].addMessage(message).then(() => {
                            res.status(200);
                        });
                    }
                );
            })
            .catch((err) => next(err));
    }
);

messageRouter.get(
    "/:chatId/:page",
    isAuthenticated,
    (req: Request, res, next) => {
        const { chatId, page } = req.params;
        const { user, chat } = req;
        ChatItem.findByPk(chatId).then((chatItem) => {
            chatItem?.getMessages().then((messages) => {
                res.status(200).json({
                    message: " 잘 온다야",
                    messages,
                });
            });
        });
    }
);

export default messageRouter;
