import User from "../models/user_mysql";

declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}
