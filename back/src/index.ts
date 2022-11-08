import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import express, { NextFunction, Request, Response } from "express";
import sequelize from "../util/database";
import Product from "./models/product";
import User from "./models/user";
import testRouter from "./routes/test";
import userRouter from "./routes/user";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.get("/", (req: Request, res: Response, next: NextFunction) => {
    if (req.cookies["access-token"]) {
        req.isAuthenticated = true;
    }
    next();
});

app.get("/", (req: Request, res, next) => {
    console.log(req.isAuthenticated, "haha");
    res.send("Hi This is my First Express Server");
});

app.use("/test", testRouter);
app.use("/user", userRouter);

app.use((req, res, next) => {
    res.status(404).send("<h1>Page not Fount 404 Error</h1>");
});

Product.sync();
User.sync();
sequelize
    .sync()
    .then((res) => {
        // console.log(res)
        app.listen("8000", () => {
            console.log(`
            #############################################
                🛡️ Server listening on port: 8000 🛡️
            #############################################      
            `);
        });
    })
    .catch((err) => {
        console.log(err);
    });
