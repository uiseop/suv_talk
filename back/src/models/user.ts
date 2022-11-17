import { dbType } from ".";
import {
    BelongsToManyAddAssociationMixin,
    BelongsToManyGetAssociationsMixin,
    DataTypes,
    Model,
} from "sequelize";
import sequelize from "../../util/database";
import Chat from "./chat";

class User extends Model {
    public readonly id!: number;
    public nickname!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public readonly Channels?: Chat[];

    public addChannel!: BelongsToManyAddAssociationMixin<Chat, number>;
    public getChannels!: BelongsToManyGetAssociationsMixin<Chat>;
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
    db.User.belongsToMany(db.Chat, {
        through: "Channel",
        as: "Channels",
        foreignKey: "participantId",
    });

};

export default User;
