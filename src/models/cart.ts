import { 
  DataTypes, 
  Model, 
  type InferAttributes, 
  type InferCreationAttributes, 
  type CreationOptional, 
  type BelongsToManyGetAssociationsMixin,
  type BelongsToManyAddAssociationMixin,
  type BelongsToManySetAssociationsMixin
} from "sequelize";
import sequelize from "../utils/database.js"; // Note: .js for ESM compatibility
import type Product from "./product.ts";

export class Cart extends Model<InferAttributes<Cart>, InferCreationAttributes<Cart>> {
  declare id: CreationOptional<number>;

  declare getProducts: BelongsToManyGetAssociationsMixin<Product>;
  declare addProduct: BelongsToManyAddAssociationMixin<Product, number>;
  declare setProducts: BelongsToManySetAssociationsMixin<Product, number>;
}

Cart.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    }
  },
  { 
    sequelize, 
    modelName: 'cart' 
  }
);

export default Cart;