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

    declare userId: ForeignKey<User["id"]>;
    declare chatId: ForeignKey<Chat["id"]>;
}

ChatItem.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
    },
    { sequelize }
);

export default ChatItem;
