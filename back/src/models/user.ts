import {
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
    CreationOptional,
    HasManyGetAssociationsMixin,
} from "sequelize";
import sequelize from "../../util/database";
import ChatItem from "./chat_item";
import Message from "./message";

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare id: CreationOptional<number>;
    declare nickname: string;

    declare getChatItems: HasManyGetAssociationsMixin<ChatItem>;
    declare getMessages: HasManyGetAssociationsMixin<Message>;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nickname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    { sequelize }
);

export default User;
