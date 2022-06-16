import { Router } from "express";
const router = Router();

import { register, get } from "../controllers/user.controller";

router.get("/:phone", get);
router.post("/register", register);

export default router;
