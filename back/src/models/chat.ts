import {
    CreationOptional,
    DataTypes,
    ForeignKey,
    HasManyCreateAssociationMixin,
    HasManyGetAssociationsMixin,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from "sequelize";
import sequelize from "../../util/database";
import ChatItem from "./chat_item";
import User from "./user";

class Chat extends Model<InferAttributes<Chat>, InferCreationAttributes<Chat>> {
    declare id: CreationOptional<number>;

    declare UserId: ForeignKey<User["id"]>;
    declare chatId: ForeignKey<ChatItem["id"]>;

    declare createChatItem: HasManyCreateAssociationMixin<ChatItem>;
    declare getChatItems: HasManyGetAssociationsMixin<ChatItem>;
}

Chat.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        }
    },
    { sequelize }
);

export default Chat;
