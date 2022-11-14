import { NextFunction, Request, Response } from "express";

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (req.user) {
        console.log("로그인 상태 확인 완료");
        next();
    } else {
        res.status(401).json({
            message: "로그인이 필요합니다",
        });
    }
};

export default isAuthenticated;
