import { UserModel } from "../models/user";

declare global {
    namespace Express {
        interface Request {
            isAuthenticated?: boolean;
            user?: UserModel;
        }
    }
}
