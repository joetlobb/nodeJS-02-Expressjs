// import { ObjectId } from "mongodb";
// import { getDb } from "../utils/database.ts";
// import type { IProduct } from "../types/products.ts";

// class Product {
//   private _id?: ObjectId;
//   private title: string;
//   private price: number;
//   private description: string;
//   private imageUrl: string;
//   private userId: ObjectId;

//   constructor(
//     title: string,
//     price: number,
//     description: string,
//     imageUrl: string,
//     userId: ObjectId,
//     id?: ObjectId,
//   ) {
//     this.title = title;
//     this.price = price;
//     this.description = description;
//     this.imageUrl = imageUrl;
//     this.userId = userId;
//     if (id) this._id = id;
//   }

//   save() {
//     const db = getDb();
//     let dbOp;
//     // db.collection('products').insertMany([]);
//     const productData: IProduct = {
//       title: this.title,
//       price: this.price,
//       description: this.description,
//       imageUrl: this.imageUrl,
//       userId: this.userId,
//     };

//     // If we have an _id (updating existing product), add it to the object
//     if (this._id) {
//       dbOp = db
//         .collection("products")
//         .updateOne({ _id: this._id }, { $set: productData });
//     } else {
//       dbOp = db.collection("products").insertOne(productData);
//     }

//     return dbOp
//       .then((result) => {
//         console.log(result);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }

//   static fetchAll() {
//     const db = getDb();
//     return db
//       .collection("products")
//       .find()
//       .toArray()
//       .then((products) => {
//         console.log(products);
//         return products;
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }

//   static findById(id: string) {
//     const db = getDb();

//     // 1. Validation check to prevent BSONError
//     if (!ObjectId.isValid(id)) {
//       console.log("Invalid ObjectId passed:", id);
//       return Promise.resolve(null);
//     }
//     return db
//       .collection("products")
//       .find({ _id: new ObjectId(id) })
//       .next()
//       .then((product) => {
//         return product;
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }

//   static deleteById(id: string) {
//     const db = getDb();
//     return db
//       .collection("products")
//       .deleteOne({ _id: new ObjectId(id) })
//       .then((result) => {
//         console.log("Deleted");
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }
// }

// export default Product;
