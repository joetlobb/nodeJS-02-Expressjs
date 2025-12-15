import type { IProduct } from "../types/products.ts";

export const products: IProduct[] = [];

export class Product {
    title: string;

    constructor(title: string) {
        this.title = title;
    }

    save(): void {
        products.push(this);
    }

    static fetchAll(): IProduct[] {
        return products;
    }
}