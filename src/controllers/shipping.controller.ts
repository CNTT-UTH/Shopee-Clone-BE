import { Request, Response } from 'express';
import { ProductDimensionDTO } from '~/models/dtos/product/CreateProductDTO';
import {
     shippingService,
     shippingRatesManagementService
} from '~/services/shipping.service';

class ShippingController {

     async getAllShippingChannels(req: Request, res: Response) {
          const result = await shippingService.getAllShippingChannels();

          res.send({
               success: true,
               message: null,
               result
          })
     }

     async countingRates(req: Request, res: Response) {
          const payload: ProductDimensionDTO = req.body;
          const result = await shippingRatesManagementService.countingRates(payload, "all");

          res.send({
               success: true,
               message: null,
               result
          })
     }
}

export default new ShippingController();