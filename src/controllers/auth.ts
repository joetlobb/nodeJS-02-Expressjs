import User from "../models/user.ts";
import type { IRequestHandler } from "../types/requestHandler.ts";

export const getLogin: IRequestHandler = (req, res, next) => {
  //   const isLoggedin = req.get("Cookie")?.split("=")[1] === "true";
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: false,
  });
};

export const postLogin: IRequestHandler = (req, res, next) => {
  User.findById("694b1c86fc239ce960922b71")
    .then((user) => {
      if (!user) {
        return res.redirect("/");
      }
      req.session.isLoggedin = true;
      req.session.user = user._id.toString();
      req.session.save((err) => {
        console.log(err);
        return res.redirect("/");
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const postLogout: IRequestHandler = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};
