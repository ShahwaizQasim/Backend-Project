import express from "express"
import 'dotenv/config'
import ConnectDB from "./db/index.js";
import { ENV } from "./constant.js";

const app = express();

ConnectDB();

app.get('/', (req, res) => {
    res.send("hello world")
})

app.listen(ENV.PORT, () => {
    console.log("server is running");
})