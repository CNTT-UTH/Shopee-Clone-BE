import { Request, Response, NextFunction } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { USERS_MESSAGES } from '~/constants/messages';
import { UpdateProfileReqBody } from '~/models/requests/users.requests';
import usersService from '~/services/users.service';
import mediasService from '~/services/media.service';

export class UserController {
    async getProfile(req: Request, res: Response) {
        const userId: string = req?.decoded?._id as string;

        const result = await usersService.getProfile(userId);

        res.send({
            success: true,
            message: USERS_MESSAGES.GET_PROFILE_SUCCESS,
            result,
        });
    }

    async getProfileById(req: Request, res: Response) {
        const userId: string = req?.params?.user_id as string;

        const result = await usersService.getProfile(userId);

        res.send({
            success: true,
            message: USERS_MESSAGES.GET_PROFILE_SUCCESS,
            result,
        });
    }

    async getAll(req: Request, res: Response) {
        const result = await usersService.getAll();

        res.send({
            success: true,
            message: USERS_MESSAGES.GET_PROFILE_SUCCESS,
            result,
        });
    }

    async updateProfile(req: Request<ParamsDictionary, any, UpdateProfileReqBody>, res: Response) {
        const payload: Partial<UpdateProfileReqBody> = req.body;
        const userID: string = req?.decoded?._id as string;

        const result = await usersService.updateProfile(payload, userID);

        res.send({
            success: true,
            message: USERS_MESSAGES.UPDATE_ME_SUCCESS,
            result,
        });
    }

    async updateAvatar(req: Request, res: Response) {
        const result = await mediasService.uploadUserAvatar(req);

        res.send({
            success: true,
            message: USERS_MESSAGES.UPDATE_ME_SUCCESS,
            result,
        });
    }
}

