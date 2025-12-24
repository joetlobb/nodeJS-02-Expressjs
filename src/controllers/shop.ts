import Product from "../models/product.ts";
import type { IRequestHandler } from "../types/requestHandler.ts";

export const getProducts: IRequestHandler = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "All Products",
        path: "/products",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getIndex: IRequestHandler = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getCart: IRequestHandler = (req, res, next) => {
  const user = req.user;
  if (!user) {
    return res.redirect("/");
  }
  return user
    .populate("cart.items.productId")
    .then((user) => {
      const products = user.cart.items;
      res.render("shop/cart", {
        pageTitle: "Your Cart",
        path: "/cart",
        products: products,
      });
    })
    .catch((err: Error) => {
      console.log(err);
    });
};

export const postCart: IRequestHandler = (req, res, next) => {
  const prodId = req.body.productId;
  const user = req.user;
  if (!user || !prodId) {
    return res.redirect("/products");
  }
  Product.findById(prodId)
    .then((product) => {
      if (product) {
        return user.addToCart(product);
      }
    })
    .then((result) => {
      console.log(result);
      res.redirect("/cart");
    })
    .catch((err) => {
      console.log(err);
    });
};

// export const postCartDeleteProduct: IRequestHandler = (req, res, next) => {
//   const prodId: string = req.body.productId;
//   const user = req.user;
//   if (!prodId && !user) {
//     return;
//   } else {
//     user!
//       .deleteItemFromCart(prodId)
//       .then(() => {
//         res.redirect("/cart");
//       })
//       .catch((err: Error) => {
//         console.log(err);
//       });
//   }
// };

export const getProduct: IRequestHandler = (req, res, next) => {
  const prodId = req.params.productId;
  if (!prodId) {
    res.redirect("/products");
  }
  Product.findById(prodId)
    .then((product) => {
      if (product) {
        res.render("shop/product-detail", {
          pageTitle: product.title,
          path: "/products",
          product: product,
        });
      } else {
        res.redirect("/products");
      }
    })
    .catch((err) => console.log(err));
};

// export const postOrder: IRequestHandler = (req, res, next) => {
//   const user = req.user;
//   if (!user) return;
//   user
//     .addOrder()
//     .then(() => {
//       res.redirect("/orders");
//     })
//     .catch((err: Error) => {
//       console.log(err);
//     });
// };

// export const getOrders: IRequestHandler = (req, res, next) => {
//   const user = req.user;
//   if (!user)
//     return res.render("shop/orders", {
//       pageTitle: "Your Orders",
//       path: "/orders",
//       orders: [],
//     });
//   user!
//     .getOrders()
//     .then((orders) => {
//       res.render("shop/orders", {
//         pageTitle: "Your Orders",
//         path: "/orders",
//         orders: orders,
//       });
//     })
//     .catch((err: Error) => {
//       console.log(err);
//     });
// };

// export const getCheckout: IRequestHandler = (req, res, next) => {
//   res.render("shop/checkout", { pageTitle: "Checkout", path: "/checkout" });
// };
