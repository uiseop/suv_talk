declare global {
    module "express" {
        interface Request {
            isAuthenticated?: boolean;
        }
    }
}
