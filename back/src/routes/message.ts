import { NextFunction, Request, Response, Router } from "express";
import isAuthenticated from "../middlewares/isAuthenticated";
import ChatItem from "../models/chat_item";

const messageRouter = Router();



export default messageRouter;
