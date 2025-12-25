import type { Types } from "mongoose";
import type { IProduct } from "./product.ts";

export interface IUser {
  email: string;
  password: string;
  cart: {
    items: {
      productId: Object;
      quantity: number;
    }[];
  };

  addToCart(product: IProduct): Promise<any>;
  removeFromCart(productId: string | Types.ObjectId): Promise<any>;
  clearCart(): Promise<any>;
}
