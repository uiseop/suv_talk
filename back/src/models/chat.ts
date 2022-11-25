import {
    BelongsToManyAddAssociationMixin,
    BelongsToManyGetAssociationsMixin,
    BelongsToSetAssociationMixin,
    DataTypes,
    HasOneSetAssociationMixin,
    Model,
} from "sequelize";
import sequelize from "../../util/database";
import { dbType } from ".";
import User from "./user_mysql";
import Message from "./message";

class Chat extends Model {
    public readonly id!: number;
    public chatName!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public readonly Participants?: User[];
    public readonly LastMessageId?: Message;

    public addParticipant!: BelongsToManyAddAssociationMixin<User, number>;
    public getParticipants!: BelongsToManyGetAssociationsMixin<User>;
    public setLastMessage!: BelongsToSetAssociationMixin<Message, number>;
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
    db.Chat.belongsToMany(db.User, {
        through: "Channel",
        as: "Participants",
        foreignKey: "channelId",
    });
    db.Chat.hasMany(db.Message);
    db.Chat.belongsTo(db.Message, { as: "LastMessage" });
};

export default Chat;
