import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";
import UserRouter from "./routes/userRoutes.js";

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
app.use(express.static("public")); // Yeh middleware static files (e.g., HTML, CSS, images, JavaScript files) serve karne ke liye use hota hai.
app.use(cookieParser()) // Yeh middleware cookies ko handle karne ke liye use hota hai.



app.get('/', (req, res) => {
    res.send("hello world")
})

app.use('/api', UserRouter);

export { app };