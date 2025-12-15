import path from "path";

import express from "express";
import bodyParser from "body-parser";

import rootDir from "./util/path.ts";
import { router as adminRoutes } from "./routes/admin.ts";
import shopRoutes from "./routes/shop.ts";

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(rootDir, "views"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, "..", "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).render("404", {
    pageTitle: "Page Not Found",
    path: req.url,
  });
});

app.listen(3000);
