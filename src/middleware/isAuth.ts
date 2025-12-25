import type { IRequestHandler } from "../types/requestHandler.ts";

const isAuth: IRequestHandler = (req, res, next) => {
  if (!req.session.isLoggedin) {
    return res.redirect("/login");
  }
  next();
};

export default isAuth;
