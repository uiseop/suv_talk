import bodyParser from "body-parser";
import express from "express";
import testRouter from "./routes/test";

const app = express();

const testRoutest = testRouter;

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res, next) => {
    res.send("Hi This is my First Express Server");
});

app.use(testRouter);

app.listen("8000", () => {
    console.log(`
    #############################################
        🛡️ Server listening on port: 8000 🛡️
    #############################################      
    `);
});
