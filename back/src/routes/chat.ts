import { Request, Router } from "express";
import isAuthenticated from "../middlewares/isAuthenticated";
import Chat from "../models/chat";
import ChatItem from "../models/chat_item";
import User from "../models/user";

const chatRouter = Router();



export default chatRouter;
