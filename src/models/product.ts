import fs from "fs";
import path from "path";
import rootDir from "../utils/path.ts";
import type { IProduct } from "../types/products.ts";

export const products: IProduct[] = [];

const filePath = path.join(rootDir, "data", "products.json");

const getProductsFromFile = (callback: (products: IProduct[]) => void): void => {
    fs.readFile(filePath, { encoding: "utf-8" }, (err, fileContent) => {
        if (err || fileContent === "") {
            callback([]);
        } else {
            const products: IProduct[] = JSON.parse(fileContent);
            callback(products);
        }
    })
}

export class Product implements IProduct {
    private title: string;
    private imageUrl: string;
    private price: number;
    private description: string;

    constructor(title: string, imageUrl: string, price: number, description: string) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
    }

    save(): void {
        getProductsFromFile((products: IProduct[]) => {
            const productData: IProduct = {
                title: this.title,
                imageUrl: this.imageUrl,
                price: this.price,
                description: this.description
            }
            products.push(productData);
            fs.writeFile(filePath, JSON.stringify(products), err => {
                console.log(err);
            })
        })
    }

    static fetchAll(callback: (products: IProduct[]) => void): void {
        getProductsFromFile(callback);
    }
}