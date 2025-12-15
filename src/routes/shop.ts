import { Router } from "express";
import { getCart, getCheckout, getIndex, getProducts } from "../controllers/shop.ts";

const router = Router();

router.get("/", getIndex);
router.get("/products", getProducts);
router.get("/cart", getCart);
router.get("/checkout", getCheckout);

export default router;
