import Chat, { associate as associateChat } from "./chat";
import Message from "./message";
import User, { associate as associateUser } from "./user";
export * from "../../util/database";

const db = {
    User,
    Chat,
    Message,
};

export type dbType = typeof db;

associateUser(db);
associateChat(db);
