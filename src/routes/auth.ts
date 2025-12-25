import { Router } from "express";
import {
  getLogin,
  getSignup,
  postLogin,
  postLogout,
  postSignup,
} from "../controllers/auth.ts";

const router = Router();

router.get("/login", getLogin);
router.post("/login", postLogin);
router.post("/logout", postLogout);
router.get("/signup", getSignup);
router.post("/signup", postSignup);

export default router;
