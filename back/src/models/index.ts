import Chat from "./chat";
import Message from "./message";
import User from "./user";

User.belongsToMany(Chat, { through: "User_Chat" });
User.hasMany(Message)

Chat.belongsToMany(User, { through: "User_Chat" });
Chat.hasMany(Message);


export { Chat, Message, User };
