import { dbType } from ".";
import { DataTypes, Model } from "sequelize";
import sequelize from "../../util/database";
import Chat from "./chat";
import Message from "./message";
import User from "./user";

class ChatUser extends Model {
    public readonly id!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public userId!: number;
    public chatId!: number;
}

ChatUser.init({}, { sequelize });

export const associate = (db: dbType) => {
    db.ChatUser.belongsTo(db.User);
    db.ChatUser.belongsTo(db.Chat);
};

export default ChatUser;
