import express, { NextFunction, Request, Response } from "express";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import helmet from "helmet";
import morgan from "morgan";
import userRouter from "./routes/user";
import postRouter from "./routes/post";
import cors from "cors";

const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
};

const app = express();
app.use(express.json());
app.use(cors(corsOptions));
// app.use(helmet())
// app.use(morgan("common"))

dotenv.config();

app.use("/api/user", userRouter);
app.use("/api/post", postRouter);

mongoose.connect(process.env.MONGO_URL, () => {
    console.log("Connected to MongoDB");
    app.listen(8000, () => {
        console.log(`
        #############################################
        🛡️ Server listening on port: 8000 🛡️
        #############################################      
    `);
    });
});

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(error);
    res.status(500).json({
        error: error.message,
        message: "이건 전역 에러 메시지야",
    });
});
