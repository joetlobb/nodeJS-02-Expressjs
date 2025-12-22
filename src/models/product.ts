import {
    DataTypes,
    Model,
    type InferAttributes,
    type InferCreationAttributes,
    type CreationOptional
} from "sequelize";
import sequelize from "../utils/database.js";

export class Product extends Model<InferAttributes<Product>, InferCreationAttributes<Product>> {
    declare id: CreationOptional<number>;
    declare title: string;
    declare price: number;
    declare imageUrl: string;
    declare description: string;
}

Product.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    }
},
    {
        sequelize,
        modelName: 'product'
    }
);

export default Product;