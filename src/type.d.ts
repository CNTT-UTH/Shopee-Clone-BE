import { JwtPayload } from "jsonwebtoken";
import "reflect-metadata";
import { TokenPayload } from "./models/requests/users.requests";

declare module "express" {
    interface Request {
        decoded?: TokenPayload;
        user?: User;
    }
}
