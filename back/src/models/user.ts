import { DataTypes } from "sequelize";
import sequelize from "../../util/database";

const User = sequelize.define("user", {
    uid: { type: DataTypes.STRING, allowNull: false },
});

export default User;
