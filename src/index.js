import 'dotenv/config'
import ConnectDB from "./db/index.js";
import { ENV } from "./constant.js";
import { app } from "./app.js";


ConnectDB()
    .then(() => {
        app.listen(ENV.PORT || 3000, () => {
            console.log("Server Running");
        })
    })
    .catch((err) => {
        console.log(err);
    })