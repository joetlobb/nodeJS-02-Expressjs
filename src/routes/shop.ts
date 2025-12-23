import { Router } from "express";
import {
  // getCheckout,
  getIndex,
  // getOrders,
  getProduct,
  getProducts,
  // postCart,
  // postCartDeleteProduct,
  // postOrder,
  // getCart,
} from "../controllers/shop.ts";

const router = Router();

router.get("/", getIndex);
router.get("/products", getProducts);
// router.get("/cart", getCart);
// router.post("/cart", postCart);
// router.post("/cart-delete-item", postCartDeleteProduct);
router.get("/products/:productId", getProduct);
// router.post("/create-order", postOrder);
// router.get("/orders", getOrders);
// // router.get("/checkout", getCheckout);

export default router;
