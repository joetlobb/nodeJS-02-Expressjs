import Product from "../models/product.ts";
import type { IRequestHandler } from "../types/requestHandler.ts";
import type Cart from "../models/cart.ts";

export const getProducts: IRequestHandler = (req, res, next) => {
    Product.fetchAll()
        .then((products) => {
            res.render("shop/product-list", {
                prods: products,
                pageTitle: "All Products",
                path: "/products",
            })
        })
        .catch(err => { console.log(err) });
}

export const getIndex: IRequestHandler = (req, res, next) => {
    Product.fetchAll()
        .then((products) => {
            res.render("shop/index", {
                prods: products,
                pageTitle: "Shop",
                path: "/",
            });
        })
        .catch(err => { console.log(err) });
}

export const getCart: IRequestHandler = (req, res, next) => {
    const user = req.user;
    if (user) {
        user.getCart()
            .then((cart) => {
                cart.getProducts()
                    .then(products => {
                        res.render("shop/cart", {
                            pageTitle: "Your Cart",
                            path: "/cart",
                            products: products
                        });
                    })
                    .catch((err: Error) => { console.log(err) })
            })
            .catch((err: Error) => { console.log(err) })
    } else {
        res.redirect("/");
    }
}

export const postCart: IRequestHandler = (req, res, next) => {
    const prodId = req.body.productId;
    const user = req.user;
    let fetchedCart: Cart;
    let newQuantity = 1;
    if (user && prodId) {
        user.getCart()
            .then(cart => {
                fetchedCart = cart;
                return cart.getProducts({ where: { id: prodId } })
            })
            .then(products => {
                let product;
                if (products.length > 0) {
                    product = products[0];
                }
                if (product && product.cartItem) {
                    const oldQuantity = product.cartItem.quantity;
                    newQuantity = oldQuantity + 1;
                    return product
                }
                return Product.findByPk(prodId)
            })
            .then(product => {
                if (product) {
                    return fetchedCart.addProduct(product, {
                        through: { quantity: newQuantity }
                    })
                }
            })
            .then(() => {
                res.redirect("/cart")
            })
            .catch((err: Error) => { console.log(err) })
    }
}

export const postCartDeleteProduct: IRequestHandler = (req, res, next) => {
    const prodId: string = req.body.productId;
    const user = req.user;
    if (prodId && user) {
        user.getCart()
            .then(cart => {
                return cart.getProducts({ where: { id: prodId } })
            })
            .then(products => {
                const product = products[0];
                if (product && product.cartItem) {
                    return product.cartItem.destroy();
                }
            })
            .then(() => {
                res.redirect("/cart");
            })
            .catch((err: Error) => { console.log(err) })
    }
}

export const getProduct: IRequestHandler = (req, res, next) => {
    const prodId = req.params.productId;
    if (prodId) {
        // Using WHERE clause
        // Product.findAll({ where: { id: prodId } })
        //     .then(products => {
        //         if (products.length > 0) {
        //             const product = products[0];
        //             if (product) {
        //                 res.render("shop/product-detail", {
        //                     pageTitle: product.title,
        //                     path: "/products",
        //                     product: product
        //                 })
        //             }
        //         } else {
        //             res.redirect('/products');
        //         }
        //     })
        //     .catch(err => { console.log(err) });
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

export const postOrder: IRequestHandler = (req, res, next) => {
    const user = req.user;
    let fetchedCart: Cart;
    if (user) {
        user.getCart()
            .then(cart => {
                fetchedCart = cart;
                return cart.getProducts()
            })
            .then(async products => {
                try {
                    const order = await user.createOrder();
                    return await order.addProducts(products.map(product => {
                        product.orderItem = {
                            quantity: product.cartItem?.quantity ?? 1
                        };
                        return product;
                    }));
                } catch (err) {
                    console.log(err);
                }
            })
            .then(() => {
                return fetchedCart.setProducts([]);
            })
            .then(() => {
                res.redirect('/orders')
            })
            .catch((err: Error) => { console.log(err) })
    }
}

export const getOrders: IRequestHandler = (req, res, next) => {
    const user = req.user;
    user?.getOrders({ include: ['products'] })
        .then(orders => {
            res.render("shop/orders", {
                pageTitle: "Your Orders",
                path: "/orders",
                orders: orders
            });
        })
        .catch((err: Error) => { console.log(err) })
}

export const getCheckout: IRequestHandler = (req, res, next) => {
    res.render("shop/checkout", { pageTitle: "Checkout", path: "/checkout" });
}