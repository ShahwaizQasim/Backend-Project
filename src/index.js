import express from "express"
import 'dotenv/config'
import ConnectDB from "./db/index.js";

const app = express();

ConnectDB();

app.get('/', (req, res) => {
    res.send("hello world")
})

app.listen(process.env.PORT, () => {
    console.log("server is running");
})