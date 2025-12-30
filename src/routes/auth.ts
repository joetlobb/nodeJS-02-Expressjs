import { Router } from "express";
import { check } from "express-validator";
import {
  getLogin,
  getNewPassword,
  getReset,
  getSignup,
  postLogin,
  postLogout,
  postNewPassword,
  postReset,
  postSignup,
} from "../controllers/auth.ts";

const router = Router();

router.get("/login", getLogin);
router.post("/login", postLogin);
router.post("/logout", postLogout);
router.get("/signup", getSignup);
router.post(
  "/signup",
  check("email")
    .isEmail()
    .withMessage("Please enter a valid email.")
    .custom((value, { req }) => {
      if (value === "test@test.com") {
        throw new Error("This email is forbidden");
      }
      return true; // Return true to accept else condition
    }),
  postSignup,
);
router.get("/reset", getReset);
router.post("/reset", postReset);
router.get("/reset/:token", getNewPassword);
router.post("/new-password", postNewPassword);

export default router;
