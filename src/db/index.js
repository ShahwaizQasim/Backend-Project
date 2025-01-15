import mongoose from "mongoose";
import 'dotenv/config'

const ConnectDB = async () => {
      try {
         const dbConnect = await mongoose.connect(process.env.MONGODB_URI);
         console.log("MongoDB is connected");
      } catch (error) {
        console.log("MongoDB Connection Faild");
        
      }
}

export default ConnectDB;