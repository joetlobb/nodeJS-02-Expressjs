import type { Types } from "mongoose";
import type { IProduct } from "./product.ts";

export interface IUser {
  name: string;
  email: string;
  cart: {
    items: { productId: Types.ObjectId; quantity: number }[];
  };

  addToCart(product: IProduct): Promise<any>;
}
