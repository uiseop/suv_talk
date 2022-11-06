import { Router } from "express";

const testRouter = Router();

testRouter.use("/", (req, res, next) => {
    res.send("<h1>wow this is test</h1>");
});

export default testRouter;
