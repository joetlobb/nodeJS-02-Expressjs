import { Router } from "express";
import {
  getAddProduct,
  getEditProduct,
  getProducts,
  postAddProduct,
  postDeleteProduct,
  postEditProduct,
} from "../controllers/admin.ts";
import { body, check } from "express-validator";
import isAuth from "../middleware/isAuth.ts";

const router = Router();

// /admin/add-product >>> GET
router.get("/add-product", isAuth, getAddProduct);

// // /admin/products >>> GET
router.get("/products", isAuth, getProducts);

// /admin/add-product >>> POST
router.post(
  "/add-product",
  [
    check("title")
      .trim() // Sanitize first
      .isLength({ min: 3 })
      .withMessage("The length should be at least 3 characters long"),
    check("imageUrl").isURL().withMessage("Please enter a valid image URL"),
    check("price")
      .isFloat()
      .withMessage("Please enter a number"),
    check("description")
      .isLength({ min: 5, max: 400 })
      .withMessage(
        "The description should be at least 5 and maximum of 400 characters long.",
      )
      .trim(),
  ],
  isAuth,
  postAddProduct,
);

router.get("/edit-product/:productId", isAuth, getEditProduct);

router.post(
  "/edit-product",
  [
    check("title")
      .trim() // Sanitize first
      .isLength({ min: 3 })
      .withMessage("The length should be at least 3 characters long"),
    check("imageUrl").isURL().withMessage("Please enter a valid image URL"),
    check("price")
      .isFloat()
      .withMessage("Please enter a number"),
    check("description")
      .isLength({ min: 5, max: 400 })
      .withMessage(
        "The description should be at least 5 and maximum of 400 characters long.",
      )
      .trim(),
  ],
  isAuth,
  postEditProduct,
);

router.post("/delete-product", isAuth, postDeleteProduct);

export default router;
