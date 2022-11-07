import { Router } from "express";

const testRouter = Router();

testRouter.get("/", (req, res, next) => {
    res.send("<h1>wow this is best</h1>");
});

export default testRouter;
