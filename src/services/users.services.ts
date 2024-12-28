import AppDataSource from "~/config/db";
import { RegisterReqBody } from "~/models/requests/users.requests";
import { User } from "~/models/entity/user.entity";
import bcrypt from "bcrypt";
import { signToken } from "~/utils/jwt";
import { envConfig } from "~/constants/env";
import { TokenType } from "~/constants/enums";

class UserService {
    private signAccessToken(user_id: string) {
        return signToken({
            payload: {
                user_id,
                exp: Math.floor(Date.now() / 1000) + 60 * 60,
                type: TokenType.AccessToken,
            },
            privateKey: envConfig.JWT_SECRET_ACCESS_TOKEN,
            options: { algorithm: "HS256", expiresIn: envConfig.JWT_ACCESS_TOKEN_EXPIRES_IN },
        });
    }
    private signRefeshToken(user_id: string) {
        return signToken({
            payload: {
                user_id,
                exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
                type: TokenType.RefreshToken,
            },
            privateKey: envConfig.JWT_SECRET_REFRESH_TOKEN,
            options: { algorithm: "HS256", expiresIn: envConfig.JWT_REFRESH_TOKEN_EXPIRES_IN },
        });
    }

    async register(payload: RegisterReqBody) {
        payload.password = await bcrypt.hash(payload.password, 10);

        const userRepository = AppDataSource.getRepository(User);
        const user = userRepository.create(payload);
        userRepository.save(user);

        const [accessToken, refreshToken] = await Promise.all([
            this.signAccessToken(user._id),
            this.signRefeshToken(user._id),
        ]);

        return {
            accessToken,
            refreshToken,
        };
    }

    async login() {
        return {
            status: "success",
            message: "login",
        };
    }

    async greetings() {
        return {
            status: "success",
            message: "greetings",
        };
    }

    async checkEmail(email: string): Promise<boolean> {
        const userRepository = AppDataSource.getRepository(User);

        const user = await userRepository.findOneBy({ email });

        if (user) return true;
        else return false;
    }
}

export default new UserService();
