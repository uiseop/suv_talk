import {
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from "sequelize";
import sequelize from "../../util/database";

interface MessageModel
    extends Model<
        InferAttributes<MessageModel>,
        InferCreationAttributes<MessageModel>
    > {
    message: string;
}

const Message = sequelize.define<MessageModel>("message", {
    message: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

export default Message;
