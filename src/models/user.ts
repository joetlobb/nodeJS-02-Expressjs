import { 
  DataTypes, 
  Model, 
  type InferAttributes, 
  type InferCreationAttributes, 
  type CreationOptional,
  type HasOneCreateAssociationMixin,
  type HasOneGetAssociationMixin,
  type HasManyGetAssociationsMixin,
  type HasManyCreateAssociationMixin,
} from "sequelize";
import sequelize from "../utils/database.js";
import Cart from "./cart.ts";
import type Product from "./product.ts";
import type Order from "./order.ts";

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare email: string;

  // These tell TypeScript that Sequelize magic methods exist
  declare createCart: HasOneCreateAssociationMixin<Cart>;
  declare getCart: HasOneGetAssociationMixin<Cart>;
  declare getProducts: HasManyGetAssociationsMixin<Product>;
  declare createProduct: HasOneCreateAssociationMixin<Product>;
  declare createOrder: HasManyCreateAssociationMixin<Order>;
  declare getOrders: HasManyGetAssociationsMixin<Order>;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  { 
    sequelize, 
    modelName: 'user' 
  }
);

export default User;