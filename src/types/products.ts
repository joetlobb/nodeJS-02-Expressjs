import type { RowDataPacket } from "mysql2";

export interface IProduct extends RowDataPacket {
  title: string;
  imageUrl: string;
  price: number;
  description: string;
  id: string;
}
