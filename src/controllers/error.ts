import type { IRequestHandler } from "../types/requestHandler.ts";

export const get404: IRequestHandler = (req, res, next) => {
    res.status(404).render("404", {
        pageTitle: "Page Not Found",
        path: req.url,
    });
}