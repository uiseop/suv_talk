import {
    DataTypes,
    HasManyCreateAssociationMixin,
    InferAttributes,
    InferCreationAttributes,
    Model,
    CreationOptional,
    HasOneGetAssociationMixin,
    HasOneCreateAssociationMixin,
} from "sequelize";
import sequelize from "../../util/database";
import Chat from "./chat";

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare id: CreationOptional<number>;
    declare uid: string;

    declare createChat: HasOneCreateAssociationMixin<Chat>;
    declare getChat: HasOneGetAssociationMixin<Chat>;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        uid: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    { sequelize }
);

export default User;
