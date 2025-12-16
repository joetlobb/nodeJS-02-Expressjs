import type { IProduct } from "./products.ts";

export interface ICartProduct {
    id: string;
    quantity: number;
}

export interface ICart {
    products: ICartProduct[];
    totalPrice: number;
}