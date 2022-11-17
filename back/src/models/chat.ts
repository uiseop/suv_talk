import {
    BelongsToManyAddAssociationMixin,
    BelongsToManyGetAssociationsMixin,
    DataTypes,
    Model,
} from "sequelize";
import sequelize from "../../util/database";
import { dbType } from ".";
import User from "./user";

class Chat extends Model {
    public readonly id!: number;
    public chatName!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public readonly Participants?: User[];

    public addParticipant!: BelongsToManyAddAssociationMixin<User, number>;
    public getParticipants!: BelongsToManyGetAssociationsMixin<User>;
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
};

export default Chat;
