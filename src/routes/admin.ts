import { Router } from "express";
import path from "path";
import { fileURLToPath } from "url";

const router = Router();

// /admin/add-product >>> GET
router.get("/add-product", (req, res, next) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    res.sendFile(path.join(__dirname, "../", "views", "add-product.html"));
});

// /admin/add-product >>> POST
router.post("/add-product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

export default router;