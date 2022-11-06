import bodyParser from "body-parser";
import express from "express";

const app = express();

app.use(bodyParser.urlencoded());

app.use("/", (req, res, next) => {
    console.log("hello this is middleware");
    next();
});

app.use((req, res, next) => {
    console.log("another middleware");
    next();
});

app.get("/", (req, res, next) => {
    res.send("Hi This is my First Express Server");
});

app.listen("8000", () => {
    console.log(`
    #############################################
        🛡️ Server listening on port: 8000 🛡️
    #############################################      
    `);
});
