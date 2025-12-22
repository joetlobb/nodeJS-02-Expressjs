import path from "path";

import express from "express";
import bodyParser from "body-parser";

import rootDir from "./utils/path.ts";
import adminRoutes from "./routes/admin.ts";
import shopRoutes from "./routes/shop.ts";
import { get404 } from "./controllers/error.ts";
import { mongoConnect } from "./utils/database.ts";
import User from "./models/user.ts";
import { ObjectId } from "mongodb";

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(rootDir, "views"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, "..", "public")));

app.use((req, res, next) => {
    User.findById('69494b4842d2c5f5157ae8c0')
        .then(user => {
            if (user) {
                req.user = new User(user.name, user.email, user._id)
            }
            next();
        })
        .catch(err => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(get404);

mongoConnect(() => {
    app.listen(3000);
})
