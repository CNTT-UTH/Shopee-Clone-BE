import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { RegisterReqBody } from "~/models/requests/users.requests";
import UserService from "~/services/users.services";

class UserController {
    greetings = async (req: Request, res: Response) => {
        // console.log(req);
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
        console.log(reqBody);
        await UserService.register(reqBody);
        res.send({
            ...reqBody,
        });
    };
}

export default new UserController();
