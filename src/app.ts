import express from "express";
import bodyParser from "body-parser";

import adminRoutes from "./routes/admin.ts";
import shopRoutes from "./routes/shop.ts";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(adminRoutes);
app.use(shopRoutes);


app.listen(3000);
