import { JwtPayload } from "jsonwebtoken";
import { Role, TokenType, UserVerifyStatus } from "~/constants/enums";
import { ParamsDictionary } from "express-serve-static-core";

export interface RegisterReqBody {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}
export interface LoginReqBody {
    username?: string;
    email?: string;
    password: string;
}

export interface TokenPayload extends JwtPayload {
    _id: string;
    token_type: TokenType;
    role: Role;
    verify: UserVerifyStatus;
    exp: number;
    iat: number;
}
