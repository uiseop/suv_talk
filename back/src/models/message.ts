import { DataTypes } from "sequelize";
import sequelize from "../../util/database";

const Message = sequelize.define("message", {
    message: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

export default Message;
