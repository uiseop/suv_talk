import { NextFunction, Request, RequestHandler, Response } from "express";

const asyncHandler = (requestHandler: RequestHandler) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await requestHandler(req, res, next);
        } catch (err) {
            next(err);
        }
    };
};

export default asyncHandler