import { Request, Response, NextFunction } from "express";
import { USERS_MESSAGES } from "~/constants/messages";
import usersService from "~/services/users.service";
class UserController {
    async getProfile(req: Request, res: Response) {
        const userId: string = req?.decoded?._id;

        const result = await usersService.getProfile(userId);

        res.send({
            success: true,
            message: USERS_MESSAGES.GET_PROFILE_SUCCESS,
            result,
        });
    }
}

export default new UserController();
