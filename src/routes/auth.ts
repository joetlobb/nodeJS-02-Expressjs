import { Router } from "express";
import { check, body } from "express-validator";
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
import user from "../models/user.ts";

const router = Router();

router.get("/login", getLogin);
router.post(
  "/login",
  [
    check("email").isEmail().withMessage("Please enter a valid email."),
    check(
      "password",
      "Please enter a password with number and text and at least 5 characters long",
    )
      .isLength({ min: 5 })
      .isAlphanumeric(),
  ],
  postLogin,
);
router.post("/logout", postLogout);
router.get("/signup", getSignup);
router.post(
  "/signup",
  [
    check("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom((value, { req }) => {
        // if (value === "test@test.com") {
        //   throw new Error("This email is forbidden");
        // }
        // return true; // Return true to accept else condition
        return user.findOne({ email: value }).then((userData) => {
          if (userData) {
            return Promise.reject("Email already existed");
          }
        });
      }),
    body(
      "password",
      "Please enter a password with only number and text and at least 5 characters long",
    )
      .isLength({ min: 5 })
      .isAlphanumeric(),
    body("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not matched");
      }
      return true;
    }),
  ],
  postSignup,
);
router.get("/reset", getReset);
router.post("/reset", postReset);
router.get("/reset/:token", getNewPassword);
router.post("/new-password", postNewPassword);

export default router;
