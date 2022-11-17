import { NextFunction, Request, Response, Router } from "express";
import isAuthenticated from "../middlewares/isAuthenticated";

const messageRouter = Router();

export default messageRouter;
