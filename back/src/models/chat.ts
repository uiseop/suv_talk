import {
    CreationOptional,
    DataTypes,
    HasManyCreateAssociationMixin,
    HasManyGetAssociationsMixin,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from "sequelize";
import sequelize from "../../util/database";
import ChatItem from "./chat_user";
import Message from "./message";
import { dbType } from '.';

class Chat extends Model {
    public readonly id!: number;
    public chatName!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

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

export const associate = (db: dbType) => {
    db.Chat.hasMany(db.ChatUser)
}

export default Chat;
