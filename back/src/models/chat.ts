import {
    CreationOptional,
    DataTypes,
    HasManyGetAssociationsMixin,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from "sequelize";
import sequelize from "../../util/database";
import ChatItem from "./chat_item";
import Message from "./message";

class Chat extends Model<InferAttributes<Chat>, InferCreationAttributes<Chat>> {
    declare id: CreationOptional<number>;
    declare chatName: string;

    // createdAt can be undefined during creation
    declare createdAt: CreationOptional<Date>;
    // updatedAt can be undefined during creation
    declare updatedAt: CreationOptional<Date>;

    declare getChatItems: HasManyGetAssociationsMixin<ChatItem>;
    declare getMessages: HasManyGetAssociationsMixin<Message>;
}

Chat.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        chatName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    },
    { sequelize }
);

export default Chat;
