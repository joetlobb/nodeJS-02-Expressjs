import type { IRequestHandler } from "../types/express-types.ts";
import type { IProduct } from "../models/products.ts";

export const products: IProduct[] = [];

export const getAddProduct: IRequestHandler = (req, res, next) => {
    res.render("add-product", {
        pageTitle: "Add Product",
        path: "/admin/add-product",
        productCSS: true,
        formsCSS: true,
        activeAddProduct: true,
    });
}

export const postAddProduct: IRequestHandler = (req, res, next) => {
    products.push({ title: req.body.title });
    res.redirect("/");
}

export const getProducts: IRequestHandler = (req, res, next) => {
    res.render("shop", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
        productCSS: true,
        activeShop: true,
        hasProducts: products.length > 0,
    });
}