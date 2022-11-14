import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors, { CorsOptions } from "cors";
import express, { NextFunction, Request, Response } from "express";
import sequelize from "../util/database";
import Chat from "./models/chat";
import ChatItem from "./models/chat_item";
import Message from "./models/message";
import User from "./models/user";
import chatRouter from "./routes/chat";
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
app.use("/chat", chatRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).send("<h1>Page not Fount 404 Error</h1>");
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({ error });
});

User.hasMany(Message);
Message.belongsTo(User);

User.belongsToMany(Chat, { through: ChatItem });
Chat.belongsToMany(User, { through: ChatItem });

Chat.hasMany(Message);
Message.belongsTo(Chat);

sequelize
    .sync({ force: true })
    .then((res) => {
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
