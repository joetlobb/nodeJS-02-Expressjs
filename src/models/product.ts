import { getDb } from "../utils/database.ts";

class Product {
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
        return db.collection('products').insertOne(this)
            .then(result => {
                console.log(result)
            })
            .catch(err => { console.log(err) })
    }
}

export default Product;