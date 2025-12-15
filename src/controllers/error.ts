import type { IRequestHandler } from "../types/express-types.ts";

export const get404: IRequestHandler = (req, res, next) => {
    res.status(404).render("404", {
        pageTitle: "Page Not Found",
        path: req.url,
    });
}