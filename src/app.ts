import path from "path";

import express from "express";
import bodyParser from "body-parser";

import rootDir from "./utils/path.ts";
import adminRoutes from "./routes/admin.ts";
import shopRoutes from "./routes/shop.ts";
import { get404 } from "./controllers/error.ts";
import sequelize from "./utils/database.ts";
import Product from "./models/product.ts";
import User from "./models/user.ts";

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(rootDir, "views"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, "..", "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(get404);

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);

sequelize
    .sync(
        // { force: true }
    )
    .then((result) => {
        console.log(result);
        app.listen(3000);
    })
    .catch(err => console.log(err));

