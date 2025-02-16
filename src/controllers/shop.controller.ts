import { Request, Response, NextFunction } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { RegisterInfoShopDTO } from '~/models/dtos/ShopDTO';
import { ShopService } from '~/services/shop.service';

export class ShopController {
    constructor(
        private readonly shopService: ShopService,
    ) {

    }
    async register(req: Request<ParamsDictionary, any, RegisterInfoShopDTO>, res: Response, next: NextFunction) {
        const payload: RegisterInfoShopDTO = req.body;
        console.log(req.decoded);
        payload.user_id = req?.decoded?._id;
        const result = await this.shopService.register(payload);

        res.send({
            success: true,
            message: 'Register Shop is successfully!',
            result,
        });
    }

    async getInfo(req: Request, res: Response, next: NextFunction) {
        const result = await this.shopService.getInfo(req?.decoded?._id as string);

        res.send({
            success: true,
            message: 'Get Info suscessful',
            result,
        });
    }

    async getInfoById(req: Request, res: Response, next: NextFunction) {
        const result = await this.shopService.getInfoById(req?.params?.shop_id);

        res.send({
            success: true,
            message: null,
            result,
        });
    }
}
