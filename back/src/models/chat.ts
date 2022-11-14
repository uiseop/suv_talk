import {
    CreationOptional,
    DataTypes,
    HasManyCreateAssociationMixin,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from "sequelize";
import sequelize from "../../util/database";
import ChatItem from "./chat_item";

class Chat extends Model<InferAttributes<Chat>, InferCreationAttributes<Chat>> {
    declare id: CreationOptional<number>;
    declare room_name: string;

    declare createChatItem: HasManyCreateAssociationMixin<ChatItem>;
}

Chat.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        room_name: {
            type: DataTypes.STRING,
        },
    },
    { sequelize }
);

export default Chat;
