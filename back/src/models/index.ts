import Chat from "./chat";
import Message from "./message";
import Product from "./product";
import User from "./user";

User.belongsToMany(Chat, { through: "User_Chat" });

Chat.belongsToMany(User, { through: "User_Chat" });
Chat.hasMany(Message);

Message.hasMany(User, { foreignKey: "uid" });

export { Chat, Message, User, Product };
