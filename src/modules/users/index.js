import { Router } from "express";
import { AddUsers } from "./controllers/user.register.js";

const router = Router();

// router.get('/', GetUsers)
router.post('/', AddUsers);

export default router;