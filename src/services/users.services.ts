import AppDataSource from "~/config/db";
import { LoginReqBody, RegisterReqBody } from "~/models/requests/users.requests";
import { User } from "~/models/entity/user.entity";
import bcrypt from "bcrypt";
import { signToken } from "~/utils/jwt";
import { envConfig } from "~/constants/env";
import { TokenType } from "~/constants/enums";
import { ApiError } from "~/utils/errors";
import { USERS_MESSAGES } from "~/constants/messages";

class UserService {
    private signAccessToken(user_id: string) {
        return signToken({
            payload: {
                user_id,
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

    async login(payload: LoginReqBody) {
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOne({
            where: [{ email: payload.email }, { username: payload.username }],
        });

        const result = await this.checkPassword(payload.password, (user as User)?.password);

        if (!result) {
            throw new ApiError(USERS_MESSAGES.PASSWORD_IS_INCORRECT, 400);
        }

        const [accessToken, refreshToken] = await Promise.all([
            this.signAccessToken((user as User)?._id),
            this.signRefeshToken((user as User)?._id),
        ]);

        return {
            accessToken,
            refreshToken,
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

    async checkUsername(username: string): Promise<boolean> {
        const userRepository = AppDataSource.getRepository(User);

        const user = await userRepository.findOneBy({ username });

        if (user) return true;
        else return false;
    }

    async checkPassword(password: string, correctPassword: string): Promise<boolean> {
        const result = await bcrypt.compareSync(password, correctPassword);

        return result;
    }
}

export default new UserService();
