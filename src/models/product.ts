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
        
    }
}

export default Product;