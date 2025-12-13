import { Router } from "express";

const router = Router();
import { products } from "./admin.ts";

router.get("/", (req, res, next) => {
  res.render("shop", {
    prods: products,
    pageTitle: "Shop",
    path: "/",
    productCSS: true,
    activeShop: true,
    hasProducts: products.length > 0,
  });
});

export default router;
