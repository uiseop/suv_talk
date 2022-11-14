import {
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from "sequelize";
import sequelize from "../../util/database";

interface ChatModel
    extends Model<
        InferAttributes<ChatModel>,
        InferCreationAttributes<ChatModel>
    > {
    room_name: string;
}

const Chat = sequelize.define<ChatModel>("chat", {
    room_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

export default Chat;
