import type { ObjectId } from "mongodb";

export interface IProduct {
    _id?: ObjectId;
    title: string;
    price: number;
    description: string;
    imageUrl: string;
}