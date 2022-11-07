import { DataTypes } from "sequelize";
import sequelize from "../../util/database";

const Product = sequelize.define("product", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    title: DataTypes.STRING,
});

export default Product;
