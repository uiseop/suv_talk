import { dbType } from ".";
import { DataTypes, Model } from "sequelize";
import sequelize from "../../util/database";
import Chat from "./chat";
import ChatItem from "./chat_user";
import Message from "./message";

class User extends Model {
    public readonly id!: number;
    public nickname!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

User.init(
    {
        nickname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    { sequelize }
);

export const associate = (db: dbType) => {
    db.User.hasMany(db.ChatUser)
};

export default User;
