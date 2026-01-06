import { validationResult } from "express-validator";
import Product from "../models/product.ts";
import type { IRequestHandler } from "../types/requestHandler.ts";

export const getAddProduct: IRequestHandler = (req, res, next) => {
  // Not Scalable Way
  // if (!req.session.isLoggedin) {
  //   res.redirect("/");
  // }
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
    errorMessage: null,
    hasError: false,
    validationErrors: [],
  });
};

export const postAddProduct: IRequestHandler = (req, res, next) => {
  const title = req.body.title;
  const price = req.body.price === '' ? '' : +req.body.price;
  const description = req.body.description;
  const imageUrl = req.body.imageUrl;
  const user = req.user;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render("admin/edit-product", {
      pageTitle: "Add Product",
      path: "/admin/add-product",
      editing: false,
      product: {
        title: title,
        imageUrl: imageUrl,
        price: price,
        description: description,
      },
      errorMessage: errors.array()[0]?.msg,
      hasError: true,
      validationErrors: errors.array(),
    });
  }
  if (!user) return res.redirect("/");
  const product = new Product({
    title: title,
    price: price,
    description: description,
    imageUrl: imageUrl,
    userId: user._id,
  });
  product
    .save()
    .then(() => {
      res.redirect("/");
    })
    .catch((err: Error) => {
      console.log(err);
    });
};

export const getEditProduct: IRequestHandler = (req, res, next) => {
  const editMode = req.query.edit === "true" ? true : false;
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;
  if (!prodId) {
    res.redirect("/admin/products");
  }
  Product.findById(prodId)
    .then((product) => {
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        product: product,
        errorMessage: null,
        validationErrors: []
      });
    })
    .catch((err: Error) => {
      console.log(err);
    });
};

export const postEditProduct: IRequestHandler = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price === '' ? '' : +req.body.price;
  const updatedDescription = req.body.description;
  const updatedImageUrl = req.body.imageUrl;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: true,
      product: {
        title: updatedTitle,
        imageUrl: updatedImageUrl,
        price: updatedPrice,
        description: updatedDescription,
        _id: prodId,
      },
      errorMessage: errors.array()[0]?.msg,
      hasError: true,
      validationErrors: errors.array(),
    });
  }
  const user = req.user;
  if (!prodId && !user) return res.redirect("/admin/products");
  Product.findById(prodId)
    .then((product) => {
      if (!product) {
        res.redirect("/admin/products");
        return;
      } else if (product.userId.toString() !== user!._id.toString()) {
        res.redirect("/admin/products");
        return;
      }
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.description = updatedDescription;
      product.imageUrl = updatedImageUrl;
      return product.save().then((result) => {
        if (result) {
          console.log("Updated product");
          res.redirect("/admin/products");
        }
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getProducts: IRequestHandler = (req, res, next) => {
  const user = req.user;
  if (user && user._id) {
    Product.find({ userId: user._id })
      // .select("title price -_id") // only fetch title and price field and exclude the _id
      // .populate("userId", "name") // only fetch name field
      .then((products) => {
        if (products) {
          console.log("getProducts()", products);
          res.render("admin/products", {
            prods: products,
            pageTitle: "Admin Products",
            path: "/admin/products",
          });
          return;
        }
      })
      .catch((err: Error) => {
        console.log(err);
      });
  } else {
    res.redirect("/");
    return;
  }
};

export const postDeleteProduct: IRequestHandler = (req, res, next) => {
  const prodId = req.body.productId;
  const user = req.user;
  if (!prodId && !user) {
    return res.redirect("/admin/products");
  }
  Product.deleteOne({ _id: prodId, userId: user!._id })
    .then((result) => {
      console.log("Deleted product", result);
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
};
