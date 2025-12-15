import { Router } from "express";
import { getCart, getCheckout, getIndex, getOrders, getProduct, getProducts } from "../controllers/shop.ts";

const router = Router();

router.get("/", getIndex);
router.get("/products", getProducts);
router.get("/cart", getCart);
router.get("/product/:productId", getProduct);
router.get("/orders", getOrders);
router.get("/checkout", getCheckout);

export default router;
