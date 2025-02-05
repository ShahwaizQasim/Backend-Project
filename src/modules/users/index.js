import { Router } from "express";
import { upload } from "../../middlewares/multer.middleware.js"
import { RegisterUsers } from "./controllers/user.register.js"
import { LoginUser, LogoutUser } from "./controllers/user.login.js"
import { verifyUser } from "../../middlewares/userAuth.middleware.js";

const router = Router();

router.post('/register', upload.fields([
    {
        name: "avatar",
        maxCount: 1
    },
    {
        name: "coverImage",
        maxCount: 1,
    }
]), RegisterUsers)

router.post('/login', LoginUser)
router.post('/logout', verifyUser, LogoutUser);

export { router }