import { Model } from 'sequelize';

export interface IProduct extends Model {
  title: string;
  imageUrl: string;
  price: number;
  description: string;
  id: string;
}
