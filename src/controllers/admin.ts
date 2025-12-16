import { Product } from "../models/product.ts";
import type { IRequestHandler } from "../types/express-types.ts";
import type { IProduct } from "../types/products.ts";

export const getAddProduct: IRequestHandler = (req, res, next) => {
    res.render("admin/edit-product", {
        pageTitle: "Add Product",
        path: "/admin/add-product",
        editing: false,
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

export const getEditProduct: IRequestHandler = (req, res, next) => {
    const editMode = req.query.edit === "true" ? true : false;
    if (!editMode) {
        return res.redirect("/");
    };
    const prodId = req.params.productId;
    if (prodId) {
        Product.findById(prodId, (product: IProduct) => {
            if (!product) {
                return res.redirect("/");
            };
            res.render("admin/edit-product", {
                pageTitle: "Edit Product",
                path: "/admin/edit-product",
                editing: editMode,
                product: product,
            });
        });
    }
}

export const postEditProduct: IRequestHandler = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedImageUrl = req.body.imageUrl;
    const updatedPrice = +req.body.price;
    const updatedDescription = req.body.description;
    const updatedProduct = new Product(updatedTitle, updatedImageUrl, updatedPrice, updatedDescription, prodId);
    updatedProduct.save();
    res.redirect("/admin/products");
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

export const postDeleteProduct: IRequestHandler = (req, res, next) => {
    console.log("DELETE POST HIT");
    const prodId = req.body.productId;
    if (prodId) {
        Product.deleteById(prodId);
        res.redirect("/admin/products");
    }
}