import mongoose from "mongoose";
import 'dotenv/config'
import { ENV } from "../constant.js";

const ConnectDB = async () => {
    try {
        const dbConnect = await mongoose.connect(ENV.MONGODB_URI);
        console.log("MongoDB is connected");
    } catch (error) {
        console.log("MongoDB Connection Faild");
    }
}

export default ConnectDB;