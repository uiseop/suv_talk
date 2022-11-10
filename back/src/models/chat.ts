import { DataTypes } from "sequelize";
import sequelize from "../../util/database";

const Chat = sequelize.define("chat", {
    room_name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export default Chat;
