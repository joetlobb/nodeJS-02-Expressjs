import { DataTypes } from "sequelize";
import sequelize from "../utils/database.ts";

const CartItem = sequelize.define('cartItem', {
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
});

export default CartItem;