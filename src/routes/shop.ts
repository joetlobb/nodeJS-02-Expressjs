import { Router } from "express";
import path from "path";
import rootDir from "../util/path.ts";
import { products } from "./admin.ts";

const router = Router();

router.get("/", (req, res, next) => {
  console.log(products);
  res.sendFile(path.join(rootDir, "views", "shop.html"));
});

export default router;
