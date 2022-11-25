import { Server } from "socket.io";
import { createServer } from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors, { CorsOptions } from "cors";
import express, { NextFunction, Request, Response } from "express";
import { sequelize } from "./models";
import User from "./models/user";
import chatRouter from "./routes/chat";
import messageRouter from "./routes/message";
import userRouter from "./routes/user";
import io from "../util/socket";
import asyncHandler from "./middlewares/asyncHandler";
import { parse } from "cookie";

const app = express();

const corsOptions: CorsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.cookies;
    const Io = io.getIo();
    if (id) {
        User.findByPk(id).then(async (user) => {
            if (user) {
                req.user = user;
                console.log(user.nickname);
                const channels = await user.getChannels();
            }
            next();
        });
    } else {
        next();
    }
});

app.use("/user", userRouter);
app.use("/chat", chatRouter);
app.use("/message", messageRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).send("<h1>Page not Fount 404 Error</h1>");
});

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(error);
    res.status(500).json({
        error: error.message,
        message: "이건 전역 에러 메시지야",
    });
});

sequelize
    .sync({ force: false })
    .then((res) => {
        const httpServer = createServer(app);
        io.init(httpServer);
        const Io = io.getIo();

        Io.close();
        Io.on("connection", async (socket) => {
            socket.on("Signin", async (data) => {
                console.log("#####################");
                console.log("#####################");
                console.log("#####################");
                console.log("#####################");
                console.log("this is sign in data", data);
                const user = await User.findByPk(data.id);
                user?.update({ socketId: socket.id });
            });

            socket.on("SignOut", async (data) => {
                console.log("#####################");
                console.log("#####################");
                console.log("this is sign out data", data);
                const user = await User.findByPk(data.id);
                user?.update({ socketId: null });
            });

            const sockets = await Io.fetchSockets();
            console.log(sockets.map((socket) => socket.id));

            socket.on("disconnect", () => {
                console.log("bye");
            });
        });
        httpServer.listen("8000", () => {
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

export default io;
