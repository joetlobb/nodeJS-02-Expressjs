// import { ObjectId } from "mongodb";
// import Product from "../models/product.ts";
// import type { IRequestHandler } from "../types/requestHandler.ts";

// export const getAddProduct: IRequestHandler = (req, res, next) => {
//   res.render("admin/edit-product", {
//     pageTitle: "Add Product",
//     path: "/admin/add-product",
//     editing: false,
//   });
// };

// export const postAddProduct: IRequestHandler = (req, res, next) => {
//   const title = req.body.title;
//   const price = +req.body.price;
//   const description = req.body.description;
//   const imageUrl = req.body.imageUrl;
//   const user = req.user;
//   const userId = user?.getUserId(); // This could be undefined
//   if (!user || !userId) {
//     // If there's no user or ID, we shouldn't even try to save
//     return res.redirect("/");
//   }
//   const product = new Product(title, price, description, imageUrl, userId);
//   product
//     .save()
//     .then(() => {
//       res.redirect("/");
//     })
//     .catch((err: Error) => {
//       console.log(err);
//     });
// };

// export const getEditProduct: IRequestHandler = (req, res, next) => {
//   const editMode = req.query.edit === "true" ? true : false;
//   if (!editMode) {
//     return res.redirect("/");
//   }
//   const prodId = req.params.productId;
//   if (prodId) {
//     Product.findById(prodId)
//       .then((product) => {
//         res.render("admin/edit-product", {
//           pageTitle: "Edit Product",
//           path: "/admin/edit-product",
//           editing: editMode,
//           product: product,
//         });
//       })
//       .catch((err: Error) => {
//         console.log(err);
//       });
//   } else {
//     res.redirect("/admin/products");
//   }
// };

// export const postEditProduct: IRequestHandler = (req, res, next) => {
//   const prodId = req.body.productId;
//   const updatedTitle = req.body.title;
//   const updatedImageUrl = req.body.imageUrl;
//   const updatedPrice = +req.body.price;
//   const updatedDescription = req.body.description;
//   Product.findById(prodId)
//     .then((prod) => {
//       if (!prod) {
//         res.redirect("/admin/products");
//       } else {
//         const product = new Product(
//           updatedTitle,
//           updatedPrice,
//           updatedDescription,
//           updatedImageUrl,
//           new ObjectId(prodId),
//         );
//         return product.save();
//       }
//     })
//     .then((result) => {
//       console.log("Updated product");
//       res.redirect("/admin/products");
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

// export const getProducts: IRequestHandler = (req, res, next) => {
//   Product.fetchAll()
//     .then((products) => {
//       if (products) {
//         res.render("admin/products", {
//           prods: products,
//           pageTitle: "Admin Products",
//           path: "/admin/products",
//         });
//       }
//     })
//     .catch((err: Error) => {
//       console.log(err);
//     });
// };

// export const postDeleteProduct: IRequestHandler = (req, res, next) => {
//   const prodId = req.body.productId;
//   if (!prodId) {
//     res.redirect("/admin/products");
//   }
//   Product.deleteById(prodId)
//     .then((result) => {
//       console.log("Deleted product");
//       res.redirect("/admin/products");
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };
