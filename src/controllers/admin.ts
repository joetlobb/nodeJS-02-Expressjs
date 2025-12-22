import Product from "../models/product.ts";
import type { IRequestHandler } from "../types/requestHandler.ts";

export const getAddProduct: IRequestHandler = (req, res, next) => {
    res.render("admin/edit-product", {
        pageTitle: "Add Product",
        path: "/admin/add-product",
        editing: false,
    });
}

export const postAddProduct: IRequestHandler = (req, res, next) => {
    const title = req.body.title;
    const price = +req.body.price;
    const description = req.body.description;
    const imageUrl = req.body.imageUrl;
    const product = new Product(title, price, description, imageUrl);
    product.save()
        .then(() => {
            res.redirect("/");
        })
        .catch((err: Error) => {
            console.log(err);
            res.redirect("/");
        });

}

// export const getEditProduct: IRequestHandler = (req, res, next) => {
//     const editMode = req.query.edit === "true" ? true : false;
//     if (!editMode) {
//         return res.redirect("/");
//     };
//     const prodId = req.params.productId;
//     const user = req.user;
//     if (user && prodId) {
//         user.getProducts({ where: { id: prodId } })
//             .then((products) => {
//                 if (products) {
//                     const product = products[0];
//                     res.render("admin/edit-product", {
//                         pageTitle: "Edit Product",
//                         path: "/admin/edit-product",
//                         editing: editMode,
//                         product: product,
//                     });
//                 } else {
//                     res.redirect("/");
//                 }
//             })
//             .catch((err: Error) => {console.log(err)});
//     } else {
//         res.redirect("/");
//     }
// }

// export const postEditProduct: IRequestHandler = (req, res, next) => {
//     const prodId = req.body.productId;
//     const updatedTitle = req.body.title;
//     const updatedImageUrl = req.body.imageUrl;
//     const updatedPrice = +req.body.price;
//     const updatedDescription = req.body.description;
//     Product.findByPk(prodId)
//         .then(prod => {
//             if (!prod) {
//                 res.redirect("/admin/products");
//             } else {
//                 const product = prod;
//                 product.title = updatedTitle;
//                 product.imageUrl = updatedImageUrl;
//                 product.price = updatedPrice;
//                 product.description = updatedDescription;
//                 return product.save();
//             }
//         })
//         .then(result => {
//             console.log('Updated product');
//             res.redirect("/admin/products");
//         })
//         .catch(err => {console.log(err)});
// }

// export const getProducts: IRequestHandler = (req, res, next) => {
//     const user = req.user;
//     if (user) {
//         user.getProducts()
//             .then((products) => {
//                 res.render("admin/products", {
//                     prods: products,
//                     pageTitle: "Admin Products",
//                     path: "/admin/products",
//                 });
//             })
//             .catch((err: Error) => {console.log(err)});
//     } else {
//         res.redirect("/admin/products");
//     }
// }

// export const postDeleteProduct: IRequestHandler = (req, res, next) => {
//     const prodId = req.body.productId;
//     if (!prodId) {
//         res.redirect("/admin/products");
//     }
//     Product.findByPk(prodId)
//         .then(product => {
//             if (product) {
//                 return product.destroy();
//             } else {
//                 res.redirect("/admin/products");
//             }
//         })
//         .then(result => {
//             console.log('Deleted product');
//             res.redirect("/admin/products");
//         })
//         .catch(err => {console.log(err)})
// }