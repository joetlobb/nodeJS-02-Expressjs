import path from "path";

import express from "express";
import bodyParser from "body-parser";
import { engine as expressHbs} from "express-handlebars";

import rootDir from "./util/path.ts";
import { router as adminRoutes } from "./routes/admin.ts";
import shopRoutes from "./routes/shop.ts";

const app = express();

app.engine("hbs", expressHbs({
  layoutsDir: path.join(rootDir, 'views/layouts/'),
  defaultLayout: 'main-layout',
  extname: 'hbs'
}));
app.set("view engine", "hbs");
app.set("views", path.join(rootDir, "views"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, "..", "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).render("404", {
    pageTitle: "Page Not Found",
  });
});

app.listen(3000);
