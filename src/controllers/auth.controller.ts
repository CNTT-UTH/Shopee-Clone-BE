import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { LoginReqBody, RegisterReqBody, TokenPayload } from "~/models/requests/users.requests";
import AuthService from "~/services/auth.service";
import { USERS_MESSAGES } from "~/constants/messages";
import { RefreshReqBody } from "~/models/requests/auth.requests";

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

        const result = await AuthService.login(reqBody, req.query?.platform == "mobile" ? "mobile" : "web");

        res.send({
            suscess: true,
            message: USERS_MESSAGES.LOGIN_SUCCESS,
            result,
        });
    };

    register = async (req: Request<ParamsDictionary, any, RegisterReqBody>, res: Response) => {
        const reqBody: RegisterReqBody = req.body;

        const result = await AuthService.register(reqBody, req.query?.platform == "mobile" ? "mobile" : "web");

        res.send({
            suscess: true,
            message: USERS_MESSAGES.REGISTER_SUCCESS,
            result,
        });
    };

    refreshToken = async (req: Request<ParamsDictionary, any, RefreshReqBody>, res: Response) => {
        const reqBody: RefreshReqBody = req.body;

        const result = await AuthService.refreshToken(
            { token: reqBody.refreshToken, decoded: req?.decoded as TokenPayload },
            req.query?.platform == "mobile" ? "mobile" : "web",
        );

        res.send({
            suscess: true,
            message: USERS_MESSAGES.REFRESH_TOKEN_SUCCESS,
            result,
        });
    };
}

export default new AuthController();
