import { dbType } from ".";
import { DataTypes, Model } from "sequelize";
import sequelize from "../../util/database";

class Message extends Model {
    public readonly id!: number;
    public content!: string;

    public UserId!: number;
    public ChatId!: number;
}

Message.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    },
    { sequelize }
);

export const associate = (db: dbType) => {
    db.Message.belongsTo(db.User);
    db.Message.belongsTo(db.Chat);
};

export default Message;
