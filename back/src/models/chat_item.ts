import {
    CreationOptional,
    DataTypes,
    HasManyAddAssociationMixin,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from "sequelize";
import sequelize from "../../util/database";
import User from "./user";

class ChatItem extends Model<
    InferAttributes<ChatItem>,
    InferCreationAttributes<ChatItem>
> {
    declare id: CreationOptional<number>;

    declare addUser: HasManyAddAssociationMixin<User, number>;
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
