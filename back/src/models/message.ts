import {
    CreationOptional,
    DataTypes,
    ForeignKey,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from "sequelize";
import sequelize from "../../util/database";
import Chat from "./chat";
import User from "./user";

class Message extends Model<
    InferAttributes<Message>,
    InferCreationAttributes<Message>
> {
    declare id: CreationOptional<number>;
    declare message: string;

    // createdAt can be undefined during creation
    declare createdAt: CreationOptional<Date>;
    // updatedAt can be undefined during creation
    declare updatedAt: CreationOptional<Date>;

    declare userId: ForeignKey<User["id"]>;
    declare chatId: ForeignKey<Chat["id"]>;
}

Message.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    },
    { sequelize }
);

export default Message;
