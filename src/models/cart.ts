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

    static deleteProduct(id: string, price: number) {
        fs.readFile(filePath, { encoding: "utf-8" }, (err, fileContent) => {
            if (err && fileContent === "") {
                return;
            }
            let cart: ICart;
            cart = JSON.parse(fileContent);
            const updatedCart = { ...cart };
            if (updatedCart.products.length > 0) {
                const product = updatedCart.products.filter(prod => prod.id === id)[0];
                if (product) {
                    const productQuantity = product.quantity;
                    updatedCart.products = updatedCart.products.filter(prod => prod.id !== id);
                    updatedCart.totalPrice -= price * productQuantity;
                    fs.writeFile(filePath, JSON.stringify(updatedCart), (err) => {
                        console.log(err);
                    });
                } else {
                    return;
                }
            }
        })
    }

    static getCart(callback: (cart: ICart) => void) {
        fs.readFile(filePath, { encoding: "utf-8" }, (err, fileContent) => {
            if (err && fileContent === "") {
                return callback({ products: [], totalPrice: 0 });
            } else {
                const cart: ICart = JSON.parse(fileContent);
                callback(cart);
            }
        })
    }
}