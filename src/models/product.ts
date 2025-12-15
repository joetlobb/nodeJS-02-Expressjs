import fs from "fs";
import path from "path";
import rootDir from "../utils/path.ts";
import type { IProduct } from "../types/products.ts";

export const products: IProduct[] = [];

const filePath = path.join(rootDir, "data", "products.json");

export class Product {
    title: string;

    constructor(title: string) {
        this.title = title;
    }

    save(): void {
        let products: IProduct[] = [];
        fs.readFile(filePath, { encoding: "utf-8" }, (err, fileContent) => {
            if (!err) {
                products = JSON.parse(fileContent);
            }
            products.push(this);
            fs.writeFile(filePath, JSON.stringify(products), err => {
                console.log(err);
            })
        })
    }

    static fetchAll(callback: (products: IProduct[]) => void): IProduct[] {
        fs.readFile(filePath, { encoding: "utf-8" }, (err, fileContent) => {
            if (err) {
                return [];
            }
            const products: IProduct[] = JSON.parse(fileContent);
            return callback(products);
        })
        return [];
    }
}