import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { LoginReqBody, RegisterReqBody, TokenPayload } from "~/models/requests/users.requests";
import AuthService from "~/services/auth.service";
import { USERS_MESSAGES } from "~/constants/messages";
import {
    EmailVerifyReqBody,
    ForgotPasswordReqBody,
    RefreshReqBody,
    ResetPasswordReqBody,
    VerifyPasswordReqBody,
} from "~/models/requests/auth.requests";

class AuthController {
    greetings = async (req: Request, res: Response) => {
        // (req);
        res.send({
            status: "suscess",
            message: "user",
        });
    };

    login = async (req: Request<ParamsDictionary, any, RegisterReqBody>, res: Response) => {
        const reqBody: LoginReqBody = req.body;
        const userAgent = req.headers["user-agent"] as string;

        const result = await AuthService.login(reqBody, {
            platform: req.query?.platform == "mobile" ? "mobile" : "web",
            user_agent: userAgent,
        });

        res.send({
            suscess: true,
            message: USERS_MESSAGES.LOGIN_SUCCESS,
            result,
        });
    };

    register = async (req: Request<ParamsDictionary, any, RegisterReqBody>, res: Response) => {
        const reqBody: RegisterReqBody = req.body;
        const userAgent = req.headers["user-agent"] as string;

        const result = await AuthService.register(reqBody, {
            platform: req.query?.platform == "mobile" ? "mobile" : "web",
            user_agent: userAgent,
        });

        res.send({
            suscess: true,
            message: USERS_MESSAGES.REGISTER_SUCCESS,
            result,
        });
    };

    logout = async (req: Request<ParamsDictionary, any, RefreshReqBody>, res: Response) => {
        const reqBody: RefreshReqBody = req.body;
        const userAgent = req.headers["user-agent"] as string;

        const result = await AuthService.logout(
            { _id: (req?.decoded as TokenPayload)._id },
            {
                platform: req.query?.platform == "mobile" ? "mobile" : "web",
                user_agent: userAgent,
            },
        );

        res.send({
            suscess: true,
            message: USERS_MESSAGES.LOGOUT_SUCCESS,
            result,
        });
    };

    refreshToken = async (req: Request<ParamsDictionary, any, RefreshReqBody>, res: Response) => {
        const reqBody: RefreshReqBody = req.body;
        const userAgent = req.headers["user-agent"] as string;

        const result = await AuthService.refreshToken(
            { token: reqBody.refreshToken, decoded: req?.decoded as TokenPayload },
            {
                platform: req.query?.platform == "mobile" ? "mobile" : "web",
                user_agent: userAgent,
            },
        );

        res.send({
            suscess: true,
            message: USERS_MESSAGES.REFRESH_TOKEN_SUCCESS,
            result,
        });
    };

    verifyMail = async (req: Request<ParamsDictionary, any, EmailVerifyReqBody>, res: Response) => {
        const reqBody: EmailVerifyReqBody = req.body;
        const userAgent = req.headers["user-agent"] as string;

        const result = await AuthService.verifyMail(reqBody, req?.decoded as TokenPayload, {
            platform: req.query?.platform == "mobile" ? "mobile" : "web",
            user_agent: userAgent,
        });

        res.send({
            suscess: true,
            message: USERS_MESSAGES.EMAIL_VERIFY_SUCCESS,
            result,
        });
    };

    resendVerifyMail = async (req: Request<ParamsDictionary, any, EmailVerifyReqBody>, res: Response) => {
        const reqBody: EmailVerifyReqBody = req.body;
        const userAgent = req.headers["user-agent"] as string;

        const result = await AuthService.resendVerifyEmail(reqBody?.verify_email_token, req?.decoded as TokenPayload, {
            platform: req.query?.platform == "mobile" ? "mobile" : "web",
            user_agent: userAgent,
        });

        res.send({
            suscess: true,
            message: USERS_MESSAGES.EMAIL_SEND_SUCCESS,
            result,
        });
    };

    forgotPassword = async (req: Request<ParamsDictionary, any, ForgotPasswordReqBody>, res: Response) => {
        const reqBody: ForgotPasswordReqBody = req.body;
        const userAgent = req.headers["user-agent"] as string;

        const result = await AuthService.forgotPassword(reqBody, {
            platform: req.query?.platform == "mobile" ? "mobile" : "web",
            user_agent: userAgent,
        });

        res.send({
            suscess: true,
            message: USERS_MESSAGES.VERIFY_CODE_SUCCESS,
            result,
        });
    };

    resendForgotPassword = async (req: Request<ParamsDictionary, any, VerifyPasswordReqBody>, res: Response) => {
        const reqBody: VerifyPasswordReqBody = req.body;
        const userAgent = req.headers["user-agent"] as string;

        const result = await AuthService.resendForgotPassword(
            reqBody,
            {
                platform: req.query?.platform == "mobile" ? "mobile" : "web",
                user_agent: userAgent,
            },
            req?.decoded as TokenPayload,
        );

        res.send({
            suscess: true,
            message: USERS_MESSAGES.EMAIL_SEND_SUCCESS,
            result,
        });
    };

    verifyForgotPassword = async (req: Request<ParamsDictionary, any, VerifyPasswordReqBody>, res: Response) => {
        const reqBody: VerifyPasswordReqBody = req.body;
        const userAgent = req.headers["user-agent"] as string;

        const result = await AuthService.verifyForgotPassword(
            reqBody,
            {
                platform: req.query?.platform == "mobile" ? "mobile" : "web",
                user_agent: userAgent,
            },
            req?.decoded as TokenPayload,
        );

        res.send({
            suscess: true,
            message: USERS_MESSAGES.VERIFY_FORGOT_PASSWORD_SUCCESS,
            result,
        });
    };

    resetPassword = async (req: Request<ParamsDictionary, any, ResetPasswordReqBody>, res: Response) => {
        const reqBody: ResetPasswordReqBody = req.body;
        const userAgent = req.headers["user-agent"] as string;

        const result = await AuthService.resetPassword(reqBody, {
            platform: req.query?.platform == "mobile" ? "mobile" : "web",
            user_agent: userAgent,
        }, req?.decoded as TokenPayload);

        res.send({
            suscess: true,
            message: USERS_MESSAGES.RESET_PASSWORD_SUCCESS,
            result,
        });
    };
}

export default new AuthController();
