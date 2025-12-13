import { Router } from "express";

const router = Router();
import { products } from "./admin.ts";

router.get("/", (req, res, next) => {
  res.render("shop", { prods: products, pageTitle: "Shop", path: "/" });
});

export default router;
