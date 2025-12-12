import { Router } from "express";
import path from "path";
import rootDir from "../util/path.ts";
import type { IProduct } from "../models/products.ts";

export const router = Router();

export const products: IProduct[] = [];

// /admin/add-product >>> GET
router.get("/add-product", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "add-product.html"));
});

// /admin/add-product >>> POST
router.post("/add-product", (req, res, next) => {
  products.push({ title: req.body.title });
  res.redirect("/");
});
