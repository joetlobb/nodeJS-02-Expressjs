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

export class Product {
    title: string;

    constructor(title: string) {
        this.title = title;
    }

    save(): void {
        getProductsFromFile((products: IProduct[]) => {
            products.push(this);
            fs.writeFile(filePath, JSON.stringify(products), err => {
                console.log(err);
            })
        })
    }

    static fetchAll(callback: (products: IProduct[]) => void): void {
        getProductsFromFile(callback);
    }
}