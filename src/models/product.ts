import fs from "fs";
import path from "path";
import rootDir from "../utils/path.ts";
import type { IProduct } from "../types/products.ts";
import { Cart } from "./cart.ts";

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
        getProductsFromFile((products: IProduct[]) => {
            const productData: IProduct = {
                title: this.title,
                imageUrl: this.imageUrl,
                price: this.price,
                description: this.description,
                id: this.id
            };
            const existingProductIndex = products.findIndex(prod => prod.id === this.id);
            if (existingProductIndex !== -1) {
                const updatedProducts = [...products];
                updatedProducts[existingProductIndex] = productData;
                fs.writeFile(filePath, JSON.stringify(updatedProducts), err => {
                    console.log(err);
                })
            } else {
                products.push(productData);
                fs.writeFile(filePath, JSON.stringify(products), err => {
                    console.log(err);
                })
            }
        })
    }

    static deleteById(id: string): void {
        getProductsFromFile(products => {
            const product = products.find(prod => prod.id === id);
            const updatedProducts = products.filter(prod => prod.id !== id);
            fs.writeFile(filePath, JSON.stringify(updatedProducts), err => {
                if (!err && product) {
                    const cart = Cart.deleteProduct(id, product.price)
                }
            })
        })
    }

    static fetchAll(callback: (products: IProduct[]) => void): void {
        getProductsFromFile(callback);
    }

    static findById(id: string, callback: (product: IProduct) => void) {
        getProductsFromFile(products => {
            const product = products.find(prod => prod.id === id)
            if (product) {
                callback(product);
            }
        })
    }
}