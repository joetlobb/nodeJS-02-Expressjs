import { Product } from "../models/product.ts";
import type { IRequestHandler } from "../types/express-types.ts";
import type { IProduct } from "../types/products.ts";

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
    const product = new Product(req.body.title);
    product.save();
    res.redirect("/");
}

export const getProducts: IRequestHandler = (req, res, next) => {
    Product.fetchAll((products: IProduct[]) => {
        res.render("shop", {
            prods: products,
            pageTitle: "Shop",
            path: "/",
            productCSS: true,
            activeShop: true,
            hasProducts: products.length > 0,
        });
    });
}