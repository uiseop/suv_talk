import Chat, { associate as associateChat } from "./chat";
import Message, { associate as associateMessage } from "./message";
import User, { associate as associateUser } from "./user_mysql";
export * from "../../util/database";

const db = {
    User,
    Chat,
    Message,
};

export type dbType = typeof db;

associateUser(db);
associateChat(db);
associateMessage(db);
