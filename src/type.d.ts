import { JwtPayload } from "jsonwebtoken";

declare module "express" {
    interface Request {
        decoded?: JwtPayload;
    }
}
