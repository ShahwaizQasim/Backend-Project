import { Router } from "express";
import { router } from "../modules/users/index.js";

const UserRouter = Router();
UserRouter.use('/users/auth', router);

export default UserRouter;