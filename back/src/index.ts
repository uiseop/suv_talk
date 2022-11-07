import bodyParser from "body-parser";
import express from "express";
import testRouter from "./routes/test";

const app = express();

const testRoutest = testRouter;

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res, next) => {
    res.send("Hi This is my First Express Server");
});

app.use("/test", testRouter);

app.use((req, res, next) => {
    res.status(404).send("<h1>Page not Fount 404 Error</h1>");
});

app.listen("8000", () => {
    console.log(`
    #############################################
        🛡️ Server listening on port: 8000 🛡️
    #############################################      
    `);
});
