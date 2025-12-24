import type { IRequestHandler } from "../types/requestHandler.ts";

export const getLogin: IRequestHandler = (req, res, next) => {
  const isLoggedin = req.get("Cookie")?.split("=")[1] === "true";
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: isLoggedin,
  });
};

export const postLogin: IRequestHandler = (req, res, next) => {
  res.setHeader("Set-Cookie", "loggedIn=true; HttpOnly");
  res.redirect("/");
};
