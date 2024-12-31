import AppDataSource from "~/config/db";
import { LoginReqBody, RegisterReqBody } from "~/models/requests/users.requests";
import { User } from "~/models/entity/user.entity";
import bcrypt from "bcrypt";
import { signToken } from "~/utils/jwt";
import { envConfig } from "~/constants/env";
import { Role, TokenType } from "~/constants/enums";
import { ApiError } from "~/utils/errors";
import { USERS_MESSAGES } from "~/constants/messages";
import { UserRepository } from "~/repository/user.repository";

const jwtAccessTokenObject = {
    [Role.User]: envConfig.JWT_SECRET_ACCESS_TOKEN,
    [Role.Admin]: envConfig.JWT_SECRET_ACCESS_TOKEN_ADMIN,
    [Role.Seller]: envConfig.JWT_SECRET_ACCESS_TOKEN_ADMIN,
};

const jwtRefeshTokenObject = {
    [Role.User]: envConfig.JWT_SECRET_REFRESH_TOKEN,
    [Role.Admin]: envConfig.JWT_SECRET_REFRESH_TOKEN_ADMIN,
    [Role.Seller]: envConfig.JWT_SECRET_REFRESH_TOKEN_SELLER,
};

class UserService {
    private readonly userRepository: UserRepository;

    private signAccessToken(_id: string, role: Role) {
        return signToken({
            payload: {
                _id,
                role,
                type: TokenType.AccessToken,
            },
            privateKey: jwtAccessTokenObject[role],
            options: { algorithm: "HS256", expiresIn: envConfig.JWT_ACCESS_TOKEN_EXPIRES_IN },
        });
    }

    private signRefeshToken(_id: string, role: Role) {
        return signToken({
            payload: {
                _id,
                role,
                type: TokenType.RefreshToken,
            },
            privateKey: jwtRefeshTokenObject[role],
            options: { algorithm: "HS256", expiresIn: envConfig.JWT_REFRESH_TOKEN_EXPIRES_IN },
        });
    }

    async register(payload: RegisterReqBody, platform: "mobile" | "web") {
        payload.password = await bcrypt.hash(payload.password, 10);

        const user = await this.userRepository.createAndSave(payload);

        const [accessToken, refreshToken] = await Promise.all([
            this.signAccessToken(user._id, user.role),
            this.signRefeshToken(user._id, user.role),
        ]);

        // lưu refresh token vào db
        if (platform === "mobile") {
            await this.userRepository.updateRefreshTokenMobile((user as User)?._id, refreshToken);
        } else {
            await this.userRepository.updateRefreshToken((user as User)?._id, refreshToken);
        }

        return {
            accessToken,
            refreshToken,
        };
    }

    async login(payload: LoginReqBody, platform: "mobile" | "web") {
        const user = (await this.userRepository.findByEmailOrUsername(payload?.email, payload?.username)) as User;

        const result = await this.checkPassword(payload.password, (user as User)?.password);

        if (!result) {
            throw new ApiError(USERS_MESSAGES.PASSWORD_IS_INCORRECT, 400);
        }

        // gen token mới
        const [accessToken, refreshToken] = await Promise.all([
            this.signAccessToken((user as User)?._id, user.role),
            this.signRefeshToken((user as User)?._id, user.role),
        ]);

        // lưu refresh token vào db
        if (platform === "mobile") {
            await this.userRepository.updateRefreshTokenMobile((user as User)?._id, refreshToken);
        } else {
            await this.userRepository.updateRefreshToken((user as User)?._id, refreshToken);
        }
        return {
            accessToken,
            refreshToken,
        };
    }

    async checkEmail(email: string): Promise<boolean> {
        const user = await this.userRepository.existsByEmail(email);

        if (user) return true;
        else return false;
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
}

export default new UserService();
