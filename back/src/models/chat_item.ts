import {
    CreationOptional,
    DataTypes,
    ForeignKey,
    HasManyAddAssociationMixin,
    HasManyGetAssociationsMixin,
    HasManyHasAssociationMixin,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from "sequelize";
import sequelize from "../../util/database";
import Chat from "./chat";
import Message from "./message";
import User from "./user";

class ChatItem extends Model<
    InferAttributes<ChatItem>,
    InferCreationAttributes<ChatItem>
> {
    declare id: CreationOptional<number>;
    declare room_name: string;

    declare hasUser: HasManyHasAssociationMixin<User, number>;
    declare addUser: HasManyAddAssociationMixin<User, number>;
    declare addMessage: HasManyAddAssociationMixin<Message, number>;
    declare getMessages: HasManyGetAssociationsMixin<Message>;
}

ChatItem.init(
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

export default ChatItem;
