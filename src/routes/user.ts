import { Router } from "express";
const router = Router();

import { register, verifyPhone, registerPhone, getUser } from "../controllers/user.controller";

router.get("/:phone", getUser);
router.post("/register/phone", registerPhone);
router.post("/register", register);
router.post("/verifyphone", verifyPhone);

export default router;
