import path from "path";
import { fileURLToPath } from "url";

import express from "express";
import bodyParser from "body-parser";

import adminRoutes from "./routes/admin.ts";
import shopRoutes from "./routes/shop.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(3000);
