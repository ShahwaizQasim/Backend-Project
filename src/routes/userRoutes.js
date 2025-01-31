import { Router } from "express";
import router from "../modules/users/index.js";

const UserRouter = Router();
UserRouter.use('/register', router);

export default UserRouter;