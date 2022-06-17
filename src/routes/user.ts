import { Router } from "express";
const router = Router();

import { register, get, verifyPhone } from "../controllers/user.controller";

router.get("/:phone", get);
router.post("/register", register);
router.post("/verifyphone", verifyPhone);

export default router;
