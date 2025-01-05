import { LoginReqBody, RegisterReqBody, TokenPayload } from "~/models/requests/users.requests";
import { User } from "~/models/entity/user.entity";
import bcrypt from "bcrypt";
import { signToken } from "~/utils/jwt";
import { envConfig } from "~/constants/env";
import { Role, TokenType, UserVerifyStatus } from "~/constants/enums";
import { ApiError } from "~/utils/errors";
import { USERS_MESSAGES } from "~/constants/messages";
import { UserRepository } from "~/repository/user.repository";
import {
    EmailVerifyReqBody,
    ForgotPasswordReqBody,
    HandleMultiPlatformParams,
    ResetPasswordReqBody,
    VerifyPasswordReqBody,
} from "~/models/requests/auth.requests";
import { genCodeVerify } from "~/utils/genCode";
import HTTP_STATUS from "~/constants/httpStatus";
import { sendVerifyEmail } from "~/utils/email";

const codeVerifyMail: Record<string, string> = {} as const;

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

    private signVerifyEmailToken(payload: TokenPayload) {
        return signToken({
            payload: {
                ...payload,
                token_type: TokenType.EmailVerifyToken,
            },
            privateKey: envConfig.JWT_SECRET_EMAIL_VERIFY_TOKEN,
            options: { algorithm: "HS256", expiresIn: envConfig.JWT_EMAIL_VERIFY_TOKEN_EXPIRES_IN },
        });
    }

    private signForgotPasswordToken(payload: TokenPayload) {
        return signToken({
            payload: {
                ...payload,
                token_type: TokenType.ForgotPasswordToken,
            },
            privateKey: envConfig.JWT_SECRET_FORGOT_PASSWORD_TOKEN,
            options: { algorithm: "HS256", expiresIn: envConfig.JWT_FORGOT_PASSWORD_TOKEN_EXPIRES_IN },
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

    private genCodeVerify(_id: string) {
        const code = genCodeVerify();
        codeVerifyMail[_id] = code;
        return code;
    }

    private checkCode(_id: string, code: string) {
        const correctCode = codeVerifyMail[_id];
        delete codeVerifyMail[_id];
        if (code === correctCode) return true;
        return false;
    }

    async register(payload: RegisterReqBody, platformParams: HandleMultiPlatformParams) {
        payload.password = await bcrypt.hash(payload.password, 10);
        console.log(payload);

        const user = await this.userRepository.createAndSave(payload);

        const tokenPayload: TokenPayload = {
            _id: user._id,
            role: user.role,
            verify: user.verify,
            user_agent: platformParams.user_agent,
        };

        // const [accessToken, refreshToken] = await Promise.all([
        //     this.signAccessToken(tokenPayload),
        //     this.signRefeshToken(tokenPayload),
        // ]);

        // // lưu refresh token vào db
        // if (platformParams.platform === "mobile") {
        //     await this.userRepository.updateRefreshTokenMobile((user as User)?._id, refreshToken);
        // } else {
        //     await this.userRepository.updateRefreshToken((user as User)?._id, refreshToken);
        // }

        const verifyMailToken = await this.signVerifyEmailToken(tokenPayload);
        const code = this.genCodeVerify(user._id);

        sendVerifyEmail({ toAddress: user.email, toName: user?.username, code });

        return {
            verify_mail_token: verifyMailToken,
        };
    }

    async login(payload: LoginReqBody, platformParams: HandleMultiPlatformParams) {
        const user = (await this.userRepository.findByEmailOrUsername(payload?.email, payload?.username)) as User;
        const result = await this.checkPassword(payload.password, (user as User)?.password);

        if (!result) {
            throw new ApiError(USERS_MESSAGES.PASSWORD_IS_INCORRECT, HTTP_STATUS.BAD_REQUEST);
        }
        const tokenPayload: TokenPayload = {
            _id: user._id,
            role: user.role,
            verify: user.verify,
            user_agent: platformParams.user_agent,
        };

        if (user.verify === UserVerifyStatus.Unverified) {
            const verifyMailToken = await this.signVerifyEmailToken(tokenPayload);
            const code = this.genCodeVerify(user._id);

            sendVerifyEmail({ toAddress: user.email, toName: user?.username, code });

            throw new ApiError(USERS_MESSAGES.USER_NOT_VERIFIED, HTTP_STATUS.BAD_REQUEST, undefined, {
                verify_mail_token: verifyMailToken,
            });
        }

        // gen token mới
        const [accessToken, refreshToken] = await Promise.all([
            this.signAccessToken(tokenPayload),
            this.signRefeshToken(tokenPayload),
        ]);

        // lưu refresh token vào db
        if (platformParams.platform === "mobile") {
            await this.userRepository.updateRefreshTokenMobile((user as User)?._id, refreshToken);
        } else {
            console.log(refreshToken);
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

        const payloadToken: TokenPayload = {
            _id: user._id,
            role: user.role,
            verify: user.verify,
            user_agent: platformParams.user_agent,
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

    async verifyMail(payload: EmailVerifyReqBody, decoded: TokenPayload, platformParams: HandleMultiPlatformParams) {
        const user = await this.userRepository.findById(decoded._id);

        if (!user) {
            throw new ApiError(USERS_MESSAGES.USER_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
        }

        if (this.checkCode(user._id, payload?.code as string)) {
            await this.userRepository.updateVerify(decoded._id);

            const tokenPayload: TokenPayload = {
                _id: user._id,
                role: user.role,
                verify: user.verify,
                user_agent: platformParams.user_agent,
            };

            const [accessToken, refreshToken] = await Promise.all([
                this.signAccessToken(tokenPayload),
                this.signRefeshToken(tokenPayload),
            ]);

            return {
                message: USERS_MESSAGES.EMAIL_VERIFY_SUCCESS,
                access_token: accessToken,
                refresh_token: refreshToken,
            };
        } else {
            throw new ApiError(USERS_MESSAGES.VERIFY_CODE_IS_WRONG, HTTP_STATUS.BAD_REQUEST);
        }
    }

    async resendVerifyEmail(token: string, decoded: TokenPayload, platformParams: HandleMultiPlatformParams) {
        const user = await this.userRepository.findById(decoded._id);

        if (!user) {
            throw new ApiError(USERS_MESSAGES.USER_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
        }

        const verifyMailToken = await this.signVerifyEmailToken({
            _id: user._id,
            role: user.role,
            verify: user.verify,
            user_agent: platformParams.user_agent,
        });

        const code = this.genCodeVerify(user._id);

        sendVerifyEmail({ toAddress: user.email, toName: user?.username, code });

        return {
            verify_mail_token: verifyMailToken,
        };
    }

    async checkStatus(_id: string): Promise<UserVerifyStatus> {
        const user = await this.userRepository.findById(_id);

        return user?.verify as UserVerifyStatus;
    }

    async forgotPassword(payload: ForgotPasswordReqBody, platformParams: HandleMultiPlatformParams) {
        const user = await this.userRepository.findByEmailOrUsername(payload.email, payload.username);

        if (!user) {
            throw new ApiError(USERS_MESSAGES.USER_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
        }

        const code = genCodeVerify();
        codeVerifyMail[user._id] = code;

        const forgotPasswordToken = await this.signForgotPasswordToken({
            _id: user._id,
            role: user.role,
            verify: user.verify,
            user_agent: platformParams.user_agent,
        });

        sendVerifyEmail({ toAddress: user.email, toName: user?.username, code });

        return {
            forgot_password_token: forgotPasswordToken,
        };
    }

    async resetPassword(
        payload: ResetPasswordReqBody,
        platformParams: HandleMultiPlatformParams,
        decoded: TokenPayload,
    ) {
        const user = await this.userRepository.findById(decoded._id);

        if (!user) {
            throw new ApiError(USERS_MESSAGES.USER_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
        }

        const password = await bcrypt.hash(payload.password, 10);

        await this.userRepository.updatePassword(decoded._id, password);

        return {
            message: USERS_MESSAGES.CHANGE_PASSWORD_SUCCESS,
        };
    }

    async verifyForgotPassword(
        payload: VerifyPasswordReqBody,
        platformParams: HandleMultiPlatformParams,
        decoded: TokenPayload,
    ) {
        const user = await this.userRepository.findById(decoded._id);

        if (!user) {
            throw new ApiError(USERS_MESSAGES.USER_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
        }

        if (this.checkCode(user._id, payload?.code as string)) {
            await this.userRepository.updateVerify(decoded._id);

            const code = genCodeVerify();
            codeVerifyMail[user._id] = code;

            const forgotPasswordToken = await this.signForgotPasswordToken({
                _id: user._id,
                role: user.role,
                verify: user.verify,
                user_agent: platformParams.user_agent,
            });

            return {
                message: USERS_MESSAGES.EMAIL_VERIFY_SUCCESS,
                forgot_password_token: forgotPasswordToken,
            };
        } else {
            throw new ApiError(USERS_MESSAGES.VERIFY_CODE_IS_WRONG, HTTP_STATUS.BAD_REQUEST);
        }
    }

    async resendForgotPassword(
        payload: VerifyPasswordReqBody,
        platformParams: HandleMultiPlatformParams,
        decoded: TokenPayload,
    ) {
        const user = await this.userRepository.findById(decoded._id);

        if (!user) {
            throw new ApiError(USERS_MESSAGES.USER_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
        }

        const code = genCodeVerify();
        codeVerifyMail[user._id] = code;

        const forgotPasswordToken = await this.signForgotPasswordToken({
            _id: user._id,
            role: user.role,
            verify: user.verify,
            user_agent: platformParams.user_agent,
        });

        sendVerifyEmail({ toAddress: user.email, toName: user?.username, code });

        return {
            forgot_password_token: forgotPasswordToken,
        };
    }
}

export default new AuthService();
