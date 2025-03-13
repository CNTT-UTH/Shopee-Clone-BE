import { Request, Response, NextFunction } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { USERS_MESSAGES } from '~/constants/messages';
import { UpdateProfileReqBody } from '~/models/requests/users.requests';
import { UserService } from '~/services/users.service';
import { MediaService } from '~/services/media.service';

export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly mediaService: MediaService,
    ) { }
    async getProfile(req: Request, res: Response) {
        const user_id: string = req?.decoded?._id as string;

        const result = await this.userService.getProfile(user_id);

        res.send({
            success: true,
            message: USERS_MESSAGES.GET_PROFILE_SUCCESS,
            result,
        });
    }

    async getProfileById(req: Request, res: Response) {
        const user_id: string = req?.params?.user_id as string;

        const result = await this.userService.getProfile(user_id);

        res.send({
            success: true,
            message: USERS_MESSAGES.GET_PROFILE_SUCCESS,
            result,
        });
    }

    async getAll(req: Request, res: Response) {
        const result = await this.userService.getAll();

        res.send({
            success: true,
            message: USERS_MESSAGES.GET_PROFILE_SUCCESS,
            result,
        });
    }

    async updateProfile(req: Request<ParamsDictionary, any, UpdateProfileReqBody>, res: Response) {
        const payload: Partial<UpdateProfileReqBody> = req.body;
        const user_id: string = req?.decoded?._id as string;

        const result = await this.userService.updateProfile(payload, user_id);

        res.send({
            success: true,
            message: USERS_MESSAGES.UPDATE_ME_SUCCESS,
            result,
        });
    }

    async updateAvatar(req: Request, res: Response) {
        const result = await this.mediaService.uploadUserAvatar(req);

        res.send({
            success: true,
            message: USERS_MESSAGES.UPDATE_ME_SUCCESS,
            result,
        });
    }

    async updateDefaultAddress(req: Request, res: Response) {
        const user_id: string = req?.params?.user_id as string;
        const address_id: number = Number(req?.body?.address_id);

        const result = await this.userService.setAddressDefault(user_id, address_id);
        res.send({
            success: true,
            message: USERS_MESSAGES.UPDATE_ME_SUCCESS,
            result,
        });
    }
}
