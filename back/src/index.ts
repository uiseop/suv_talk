import express from "express";

const app = express();

app.get("/", (req, res, next) => {
    res.send("Hi This is my First Express Server");
});

app.listen('8000', () => {
    console.log(`
    #############################################
        🛡️ Server listening on port: 8000 🛡️
    #############################################      
    `)
})