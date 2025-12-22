import {
    DataTypes,
    Model,
    type CreationOptional,
    type InferAttributes,
    type InferCreationAttributes
} from "sequelize";
import sequelize from "../utils/database.ts";

export class CartItem extends Model<InferAttributes<CartItem>, InferCreationAttributes<CartItem>> {
    declare id: CreationOptional<number>;
    declare quantity: number;
}

CartItem.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'cartItem'
});

export default CartItem;