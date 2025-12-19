import path from "path";

import express from "express";
import bodyParser from "body-parser";

import rootDir from "./utils/path.ts";
import adminRoutes from "./routes/admin.ts";
import shopRoutes from "./routes/shop.ts";
import { get404 } from "./controllers/error.ts";
import db from "./utils/database.ts";

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(rootDir, "views"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, "..", "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

db.execute("SELECT * FROM products").then(result => {
    console.log(result[0], result[1]);
}).catch(err => console.log(err));

app.use(get404);

app.listen(3000);
