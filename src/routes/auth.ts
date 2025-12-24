import { Router } from "express";
import { getLogin, postLogin } from "../controllers/auth.ts";

const router = Router();

router.get("/login", getLogin);
router.post("/login", postLogin);

export default router;
