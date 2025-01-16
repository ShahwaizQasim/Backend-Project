import 'dotenv/config'
import ConnectDB from "./db/index.js";
import { ENV } from "./constant.js";
import { app } from "./app.js";


ConnectDB()
    .then(() => {
        app.listen(ENV.PORT, () => {
            console.log("Server Running");
        })
    })
    .catch((err) => {
        console.log(err);

    })

app.listen(ENV.PORT, () => {
    console.log("server is running");
})