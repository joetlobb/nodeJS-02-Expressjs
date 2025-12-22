import { ObjectId } from "mongodb";
import { getDb } from "../utils/database.ts";
import type { IProduct } from "../types/products.ts";

class Product {
    private _id?: ObjectId;
    private title: string;
    private price: number;
    private description: string;
    private imageUrl: string;

    constructor(title: string, price: number, description: string, imageUrl: string) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
    }

    save() {
        const db = getDb();
        // db.collection('products').insertMany([]);
        const productData: IProduct = {
            title: this.title,
            price: this.price,
            description: this.description,
            imageUrl: this.imageUrl,
        };

        // If we have an _id (updating existing product), add it to the object
        if (this._id) {
            productData._id = this._id;
        }

        return db.collection('products').insertOne(productData)
            .then(result => {
                console.log(result)
            })
            .catch(err => { console.log(err) })
    }

    static fetchAll() {
        const db = getDb();
        return db.collection('products').find().toArray()
            .then(products => {
                console.log(products)
                return products;
            })
            .catch(err => { console.log(err) });
    }

    static findById(id: string) {
        const db = getDb();

        // 1. Validation check to prevent BSONError
        if (!ObjectId.isValid(id)) {
            console.log('Invalid ObjectId passed:', id);
            return Promise.resolve(null);
        }
        return db.collection('products').find({ _id: new ObjectId(id) }).next()
            .then(product => {
                console.log(product)
                return product;
            })
            .catch(err => { console.log(err) });
    }
}

export default Product;
