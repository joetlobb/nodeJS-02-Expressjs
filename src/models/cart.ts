import fs from "fs";
import path from "path";
import rootDir from "../utils/path.ts";
import type { ICart, ICartProduct } from "../types/cart.ts";

const filePath = path.join(rootDir, "data", "cart.json");

export class Cart {
    static addProduct(id: string, price: number) {
        fs.readFile(filePath, { encoding: "utf-8" }, (err, fileContent) => {
            let cart: ICart;
            if (!err && fileContent !== "") {
                cart = JSON.parse(fileContent);
            } else {
                cart = { products: [], totalPrice: 0 }
            }

            let updatedProduct: ICartProduct;
            const existingProductIndex = cart.products.findIndex(product => product.id === id);
            const existingProduct = cart.products[existingProductIndex];
            if (existingProduct) {
                updatedProduct = { ...existingProduct }
                updatedProduct.quantity++;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            } else {
                updatedProduct = { id: id, quantity: 1 };
                cart.products = [...cart.products, updatedProduct];
            }
            cart.totalPrice += price;

            fs.writeFile(filePath, JSON.stringify(cart), (err) => {
                console.log(err);
            })
        })
    }
}