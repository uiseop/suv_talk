import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors, { CorsOptions } from "cors";
import express, { NextFunction, Request, Response } from "express";
import sequelize from "../util/database";
import Chat from "./models/chat";
import Message from "./models/message";
import Product from "./models/product";
import User from "./models/user";
import testRouter from "./routes/test";
import userRouter from "./routes/user";

const app = express();

const corsOptions: CorsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());

app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.cookies["access-token"]) {
        req.isAuthenticated = true;
    } else {
        req.isAuthenticated = false;
    }
    next();
});

app.get("/", (req: Request, res: Response, next: NextFunction) => {
    console.log(req.isAuthenticated, "haha");
    res.send("Hi This is my First Express Server");
});

app.use("/test", testRouter);
app.use("/user", userRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).send("<h1>Page not Fount 404 Error</h1>");
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({ error });
});

Promise.all([Product.sync(), User.sync(), Chat.sync(), Message.sync()]).then(
    () => {
        sequelize
            .sync({ force: true })
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
    }
);
