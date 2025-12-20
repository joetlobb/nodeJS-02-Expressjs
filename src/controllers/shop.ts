import { Cart } from "../models/cart.ts";
import Product from "../models/product.ts";
import type { IRequestHandler } from "../types/express-types.ts";
import type { IProduct } from "../types/products.ts";

export const getProducts: IRequestHandler = (req, res, next) => {
    Product.findAll()
        .then((products) => {
            res.render("shop/product-list", {
                prods: products,
                pageTitle: "All Products",
                path: "/products",
            })
        })
        .catch(err => console.log(err));
}

export const getIndex: IRequestHandler = (req, res, next) => {
    Product.findAll()
        .then((products) => {
            res.render("shop/index", {
                prods: products,
                pageTitle: "Shop",
                path: "/",
            });
        })
        .catch(err => console.log(err));
}

export const getCart: IRequestHandler = (req, res, next) => {
    Cart.getCart((cart) => {
        // Product.fetchAll((products: IProduct[]) => {
        //     const cartProducts: { productData: IProduct, quantity: number }[] = [];
        //     for (let product of products) {
        //         const cartProductData = cart.products.find(prod => prod.id === product.id);
        //         if (cartProductData) {
        //             cartProducts.push({ productData: product, quantity: cartProductData.quantity });
        //         }
        //     }
        //     res.render("shop/cart", {
        //         pageTitle: "Your Cart",
        //         path: "/cart",
        //         products: cartProducts
        //     });
        // });
    })
}

export const postCart: IRequestHandler = (req, res, next) => {
    // const prodId: string = req.body.productId;
    // Product.findById(prodId, (product: IProduct) => {
    //     Cart.addProduct(prodId, product.price);
    // });
    // res.redirect("/cart")
}

export const postCartDeleteProduct: IRequestHandler = (req, res, next) => {
    // const prodId: string | undefined = req.body.productId;
    // if (prodId) {
    //     Product.findById(prodId, (product: IProduct) => {
    //         Cart.deleteProduct(prodId, product.price);
    //         res.redirect("/cart");
    //     });
    // }
}

export const getProduct: IRequestHandler = (req, res, next) => {
    const prodId = req.params.productId;
    if (prodId) {
        // Using WHERE clause
        Product.findAll({ where: { id: prodId } })
            .then(products => {
                if (products.length > 0) {
                    const product = products[0] as IProduct;
                    res.render("shop/product-detail", {
                        pageTitle: product.title,
                        path: "/products",
                        product: product
                    })
                } else {
                    res.redirect('/products');
                }
            })
            .catch(err => console.log(err));                
        // // Using findByPk
        // Product.findByPk(prodId)
        //     .then(prod => {
        //         if (prod) {
        //             const product = prod as IProduct;
        //             res.render("shop/product-detail", {
        //                 pageTitle: product.title,
        //                 path: "/products",
        //                 product: product
        //             })
        //         } else {
        //             res.redirect('/products');
        //         }
        //     })
        //     .catch(err => console.log(err));
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