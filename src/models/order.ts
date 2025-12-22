import {
    DataTypes,
    Model,
    type InferAttributes,
    type InferCreationAttributes,
    type CreationOptional,
    type BelongsToManyAddAssociationMixin,
} from "sequelize";
import sequelize from "../utils/database.js"; // Note: .js for ESM compatibility
import type Product from "./product.ts";

export class Order extends Model<InferAttributes<Order>, InferCreationAttributes<Order>> {
    declare id: CreationOptional<number>;

    declare addProducts: BelongsToManyAddAssociationMixin<Product[], number>;
}

Order.init(
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
        modelName: 'order'
    }
);

export default Order;