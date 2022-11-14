import {
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from "sequelize";
import sequelize from "../../util/database";

interface ChatItemModel
    extends Model<
        InferAttributes<ChatItemModel>,
        InferCreationAttributes<ChatItemModel>
    > {
    quantity: number;
}

const ChatItem = sequelize.define<ChatItemModel>("chat_item", {
    quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
});

export default ChatItem;
