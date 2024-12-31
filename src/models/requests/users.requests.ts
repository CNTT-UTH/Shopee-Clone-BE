import { JwtPayload } from "jsonwebtoken";
import { TokenType, UserVerifyStatus } from "~/constants/enums";

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
    user_id: string;
    token_type: TokenType;
    verify: UserVerifyStatus;
    exp: number;
    iat: number;
}
