import type { IRequestHandler } from "../types/requestHandler.ts";

export const getLogin: IRequestHandler = (req, res, next) => {
  //   const isLoggedin = req.get("Cookie")?.split("=")[1] === "true";
  console.log(req.session.isLoggedin);
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: false,
  });
};

export const postLogin: IRequestHandler = (req, res, next) => {
  req.session.isLoggedin = true;
  res.redirect("/");
};
