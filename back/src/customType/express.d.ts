import Chat from "../models/chat";
import User from "../models/user";

declare global {
    namespace Express {
        interface Request {
            chat?: Chat;
            user?: User;
        }
    }
}
