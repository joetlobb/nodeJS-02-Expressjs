import path from "path";
import dotenv from "dotenv";

import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import session from "express-session";
import connectMongoDBSession from "connect-mongodb-session";

import rootDir from "./utils/path.ts";
import adminRoutes from "./routes/admin.ts";
import shopRoutes from "./routes/shop.ts";
import authRoutes from "./routes/auth.ts";
import { get404 } from "./controllers/error.ts";
import User from "./models/user.ts";

dotenv.config();
const MONGODB_URI = process.env.DB_URL;

if (!MONGODB_URI) process.exit();

const app = express();
const MongoDBStore = connectMongoDBSession(session);
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "session",
});

app.set("view engine", "ejs");
app.set("views", path.join(rootDir, "views"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, "..", "public")));
app.use(
  session({
    secret: "my secret long string",
    resave: false,
    saveUninitialized: false,
    store: store,
  }),
);

app.use((req, res, next) => {
  if (!req.session || !req.session.user) {
    return next();
  }
  User.findById(req.session.user)
    .then((user) => {
      req.user = user as any;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(get404);

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    console.log("Connected");
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
