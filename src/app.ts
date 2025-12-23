import path from "path";
import dotenv from "dotenv";

import express from "express";
import bodyParser from "body-parser";

import rootDir from "./utils/path.ts";
import adminRoutes from "./routes/admin.ts";
import shopRoutes from "./routes/shop.ts";
import { get404 } from "./controllers/error.ts";
// import User from "./models/user.ts";
import mongoose from "mongoose";

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(rootDir, "views"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, "..", "public")));

// app.use((req, res, next) => {
// User.findById("69494b4842d2c5f5157ae8c0")
//   .then((user) => {
//     if (user) {
//       req.user = new User(user.name, user.email, user._id, user.cart);
//     }
//     next();
//   })
//   .catch((err) => console.log(err));
// });

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(get404);

dotenv.config();
const dbUrl = process.env.DB_URL;

if (!dbUrl) process.exit();
mongoose
  .connect(dbUrl)
  .then((result) => {
    console.log("Connected");
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
