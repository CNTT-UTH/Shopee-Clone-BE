import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { RegisterReqBody } from "~/models/requests/users.requests";
import UserService from "~/services/users.services";
import { USERS_MESSAGES } from "~/constants/messages";

class UserController {
    greetings = async (req: Request, res: Response) => {
        // (req);
        res.send({
            status: "suscess",
            message: "user",
        });
    };

    login = async (req: Request, res: Response) => {
        res.send({
            status: "success",
        });
    };

    register = async (req: Request<ParamsDictionary, any, RegisterReqBody>, res: Response) => {
        const reqBody: RegisterReqBody = req.body;

        const result = await UserService.register(reqBody);

        res.send({
            suscess: true,
            message: USERS_MESSAGES.REGISTER_SUCCESS,
            result,
        });
    };
}

export default new UserController();
