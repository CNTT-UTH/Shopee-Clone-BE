import { LoginReqBody, RegisterReqBody, TokenPayload } from "~/models/requests/users.requests";
import { User } from "~/models/entity/user.entity";
import bcrypt from "bcrypt";
import { signToken } from "~/utils/jwt";
import { envConfig } from "~/constants/env";
import { Role, TokenType } from "~/constants/enums";
import { ApiError } from "~/utils/errors";
import { USERS_MESSAGES } from "~/constants/messages";
import { UserRepository } from "~/repository/user.repository";
import { HandleMultiPlatformParams } from "~/models/requests/auth.requests";

class AuthService {
    private readonly userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    private signAccessToken(payload: TokenPayload) {
        return signToken({
            payload: {
                ...payload,
                token_type: TokenType.AccessToken,
            },
            privateKey: envConfig.JWT_SECRET_ACCESS_TOKEN,
            options: { algorithm: "HS256", expiresIn: envConfig.JWT_ACCESS_TOKEN_EXPIRES_IN },
        });
    }

    private signRefeshToken(payload: TokenPayload) {
        return signToken({
            payload: {
                ...payload,
                token_type: TokenType.RefreshToken,
            },
            privateKey: envConfig.JWT_SECRET_REFRESH_TOKEN,
            options: { algorithm: "HS256", expiresIn: envConfig.JWT_REFRESH_TOKEN_EXPIRES_IN },
        });
    }

    private rotateRefeshToken(payload: TokenPayload, exp: number) {
        return signToken({
            payload: {
                ...payload,
                exp: exp,
            },
            privateKey: envConfig.JWT_SECRET_REFRESH_TOKEN,
            options: { algorithm: "HS256" },
        });
    }

    async register(payload: RegisterReqBody, platformParams: HandleMultiPlatformParams) {
        payload.password = await bcrypt.hash(payload.password, 10);

        const user = await this.userRepository.createAndSave(payload);

        const tokenPayload: TokenPayload = {
            _id: user._id,
            role: user.role,
            verify: user.verify,
            userAgent: platformParams.userAgent,
        };

        const [accessToken, refreshToken] = await Promise.all([
            this.signAccessToken(tokenPayload),
            this.signRefeshToken(tokenPayload),
        ]);

        // lưu refresh token vào db
        if (platformParams.platform === "mobile") {
            await this.userRepository.updateRefreshTokenMobile((user as User)?._id, refreshToken);
        } else {
            await this.userRepository.updateRefreshToken((user as User)?._id, refreshToken);
        }

        return {
            accessToken,
            refreshToken,
        };
    }

    async login(payload: LoginReqBody, platformParams: HandleMultiPlatformParams) {
        const user = (await this.userRepository.findByEmailOrUsername(payload?.email, payload?.username)) as User;
        const result = await this.checkPassword(payload.password, (user as User)?.password);

        if (!result) {
            throw new ApiError(USERS_MESSAGES.PASSWORD_IS_INCORRECT, 400);
        }

        const tokenPayload: TokenPayload = {
            _id: user._id,
            role: user.role,
            verify: user.verify,
            userAgent: platformParams.userAgent,
        };

        // gen token mới
        const [accessToken, refreshToken] = await Promise.all([
            this.signAccessToken(tokenPayload),
            this.signRefeshToken(tokenPayload),
        ]);

        // lưu refresh token vào db
        if (platformParams.platform === "mobile") {
            await this.userRepository.updateRefreshTokenMobile((user as User)?._id, refreshToken);
        } else {
            await this.userRepository.updateRefreshToken((user as User)?._id, refreshToken);
        }
        return {
            accessToken,
            refreshToken,
        };
    }

    async logout(payload: { _id: string }, platformParams: HandleMultiPlatformParams) {
        if (platformParams.platform === "mobile") {
            await this.userRepository.updateRefreshTokenMobile(payload._id, "");
        } else {
            await this.userRepository.updateRefreshToken(payload._id, "");
        }

        return {
            message: USERS_MESSAGES.LOGOUT_SUCCESS,
        };
    }

    async checkEmail(email: string): Promise<boolean> {
        const check = await this.userRepository.existsByEmail(email);

        return check;
    }

    async checkUsername(username: string): Promise<boolean> {
        const user = await this.userRepository.existsByUsername(username);

        if (user) return true;
        else return false;
    }

    async checkPassword(password: string, correctPassword: string): Promise<boolean> {
        const result = await bcrypt.compareSync(password, correctPassword);

        return result;
    }

    async refreshToken(
        payload: {
            token: string;
            decoded: TokenPayload;
        },
        platformParams: HandleMultiPlatformParams,
    ) {
        const token = payload.token;
        const decoded = payload.decoded;

        const user = await this.userRepository.findById(decoded._id);

        if (!user) {
            throw new ApiError(USERS_MESSAGES.USER_NOT_FOUND, 404);
        }

        if (
            (platformParams.platform === "web" && user.refresh_token !== token) ||
            (platformParams.platform === "mobile" && user.refresh_token_mobile !== token)
        ) {
            console.log("refresh token", user.refresh_token, "\n", token);
            throw new ApiError(USERS_MESSAGES.USED_REFRESH_TOKEN_OR_NOT_EXIST, 400);
        }

        const payloadToken: TokenPayload = {
            _id: user._id,
            role: user.role,
            verify: user.verify,
            userAgent: platformParams.userAgent,
        };

        const [accessToken, refreshToken] = await Promise.all([
            this.signAccessToken(payloadToken),
            this.rotateRefeshToken(payloadToken, decoded.exp as number),
        ]);

        if (platformParams.platform === "mobile") {
            await this.userRepository.updateRefreshTokenMobile(user._id, refreshToken);
        } else {
            await this.userRepository.updateRefreshToken(user._id, refreshToken);
        }

        return {
            accessToken,
            refreshToken,
        };
    }
}

export default new AuthService();
