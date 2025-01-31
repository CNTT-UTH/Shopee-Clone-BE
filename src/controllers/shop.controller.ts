import {
     Request,
     Response, NextFunction
} from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { RegisterInfoShopDTO } from "~/models/dtos/ShopDTO";
import shopService from "~/services/shop.service";

class ShopController {
     async register(req: Request<ParamsDictionary, any, RegisterInfoShopDTO>, res: Response, next: NextFunction) {
          const payload: RegisterInfoShopDTO = req.body;
          payload.user_id = req.decoded?._id;
          const result = await shopService.register(payload);

          res.send({
               success: true,
               message: "Register Shop is successfully!",
               result
          })
     }
}

export default new ShopController();