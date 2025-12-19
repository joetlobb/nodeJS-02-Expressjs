import db from '../utils/database.ts';
import type { IProduct } from "../types/products.ts";

export const products: IProduct[] = [];

export class Product {
    private title: string;
    private imageUrl: string;
    private price: number;
    private description: string;
    private id: string;

    constructor(title: string, imageUrl: string, price: number, description: string, id?: string) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
        this.id = id ? id : Math.random().toString();
    }

    save(): void {
        
    }

    static deleteById(id: string): void {

    }

    static fetchAll() {
        return db.execute('SELECT * FROM products')
    }

    static findById(id: string, callback: (product: IProduct) => void) {

    }
}