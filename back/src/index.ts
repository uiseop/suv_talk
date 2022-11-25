import express from "express";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./routes/user";

const app = express();

dotenv.config();

app.use("/api/user", userRouter);

mongoose.connect(process.env.MONGO_URL, () => {
    console.log("Connected to MongoDB");
    app.listen(8000, () => {
        console.log(`#############################################
        🛡️ Server listening on port: 8000 🛡️
    #############################################      
    `);
    });
});
