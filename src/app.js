import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";

const app = express();

// first 
// app.use(cors({
//     origin: "url",
//     credentials: true
// }));
app.use(cors());

// app.use(express.json({ limit: "16kb" }));
app.use(express.json());
app.use(express.urlencoded()); // hamara url ke through bi data a sakhta hai tw humne express ko bata diya ky handle kar lena 
app.use(express.static("public"));
app.use(cookieParser())

app.get('/', (req, res) => {
    res.send("hello world")
})

export { app };