import type { ObjectId } from "mongodb";

export interface ICartItem {
  productId: ObjectId;
  quantity: number;
}

export interface ICart {
  items: ICartItem[];
}
