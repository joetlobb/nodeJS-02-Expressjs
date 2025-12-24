import type { Types } from "mongoose";

export interface IProduct {
  _id: Types.ObjectId;
  title: string;
  price: number;
  description: string;
  imageUrl: string;
  userId: Types.ObjectId;
}
