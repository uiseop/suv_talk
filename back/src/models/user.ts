import {
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from "sequelize";
import sequelize from "../../util/database";

interface UserModel
    extends Model<
        InferAttributes<UserModel>,
        InferCreationAttributes<UserModel>
    > {
    uid: string;
}

const User = sequelize.define<UserModel>("user", {
    uid: { type: DataTypes.STRING, allowNull: false },
});

export default User;
