import { NextFunction, Request, Response, Router } from "express";
import isAuthenticated from "../middlewares/isAuthenticated";
import ChatItem from "../models/chat_user";

const messageRouter = Router();

export default messageRouter;
