import { Product } from "../models/product.ts";
import type { IRequestHandler } from "../types/express-types.ts";
import type { IProduct } from "../types/products.ts";

export const getAddProduct: IRequestHandler = (req, res, next) => {
    res.render("admin/add-product", {
        pageTitle: "Add Product",
        path: "/admin/add-product",
        productCSS: true,
        formsCSS: true,
        activeAddProduct: true,
    });
}

export const postAddProduct: IRequestHandler = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = +req.body.price;
    const description = req.body.description;
    const product = new Product(title, imageUrl, price, description);
    product.save();
    res.redirect("/");
}

export const getProducts: IRequestHandler = (req, res, next) => {
    Product.fetchAll((products: IProduct[]) => {
        res.render("admin/products", {
            prods: products,
            pageTitle: "Admin Products",
            path: "/admin/products",
        });
    });
}