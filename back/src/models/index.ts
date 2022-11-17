import Chat, { associate as associateChat } from "./chat";
import Message from "./message";
import User, { associate as associateUser } from "./user";
import ChatUser, { associate as associateChatUser } from "./chat_user";
export * from "../../util/database";

const db = {
    User,
    Chat,
    Message,
    ChatUser,
};

export type dbType = typeof db;

associateUser(db);
associateChatUser(db);
associateChat(db);
