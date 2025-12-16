import { Product } from "../models/product.ts";
import type { IRequestHandler } from "../types/express-types.ts";
import type { IProduct } from "../types/products.ts";

export const getAddProduct: IRequestHandler = (req, res, next) => {
    res.render("admin/edit-product", {
        pageTitle: "Add Product",
        path: "/admin/add-product",
        isEditing: false,
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