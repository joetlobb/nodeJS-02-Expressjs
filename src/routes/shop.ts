import { Router } from "express";
import { getCart, getCheckout, getIndex, getOrders, getProduct, getProducts, postCart, postCartDeleteProduct, postOrder } from "../controllers/shop.ts";

const router = Router();

router.get("/", getIndex);
router.get("/products", getProducts);
// router.get("/cart", getCart);
// router.post("/cart", postCart);
// router.post("/cart-delete-item", postCartDeleteProduct);
// router.get("/product/:productId", getProduct);
// router.post("/create-order", postOrder);
// router.get("/orders", getOrders);
// router.get("/checkout", getCheckout);

export default router;
