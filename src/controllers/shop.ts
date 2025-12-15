import { Product } from "../models/product.ts";
import type { IRequestHandler } from "../types/express-types.ts";
import type { IProduct } from "../types/products.ts";

export const getProducts: IRequestHandler = (req, res, next) => {
    Product.fetchAll((products: IProduct[]) => {
        res.render("shop/product-list", {
            prods: products,
            pageTitle: "All Products",
            path: "/products",
        });
    });
}

export const getIndex: IRequestHandler = (req, res, next) => {
    Product.fetchAll((products: IProduct[]) => {
        res.render("shop/index", {
            prods: products,
            pageTitle: "Shop",
            path: "/",
        });
    });
}

export const getCart: IRequestHandler = (req, res, next) => {
    res.render("shop/cart", { pageTitle: "Your Cart", path: "/cart" });
}

export const getProduct: IRequestHandler = (req, res, next) => {
    const prodId = req.params.productId;
    if (prodId) {
        Product.findById(prodId, (product: IProduct) => {
            res.render("shop/product-detail", {
                pageTitle: product.title,
                path: "/products",
                product: product
            })
        });
    } else {
        res.redirect('/products');
    }
}

export const getOrders: IRequestHandler = (req, res, next) => {
    res.render("shop/orders", { pageTitle: "Your Orders", path: "/orders" });
}

export const getCheckout: IRequestHandler = (req, res, next) => {
    res.render("shop/checkout", { pageTitle: "Checkout", path: "/checkout" });
}