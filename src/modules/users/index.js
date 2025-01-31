import { Router } from "express";
import { AddUsers } from "./controllers/user.register.js";

const router = Router();

// router.get('/', GetUsers)
router.post('/register', AddUsers);

export default router;