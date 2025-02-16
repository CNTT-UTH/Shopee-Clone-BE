import { Request, Response } from 'express';
import { ProductDimensionDTO } from '~/models/dtos/product/CreateProductDTO';
import { ShippingService, ShippingRatesManagementService } from '~/services/shipping.service';

export class ShippingController {
    constructor(
        private readonly shippingService: ShippingService,
        private readonly shippingRatesManagementService: ShippingRatesManagementService
    ) { }

    async getAllShippingChannels(req: Request, res: Response) {
        const result = await this.shippingService.getAllShippingChannels();

        res.send({
            success: true,
            message: null,
            result
        })
    }

    async countingRates(req: Request, res: Response) {
        const payload: ProductDimensionDTO = req.body;
        const result = await this.shippingRatesManagementService.countingRates(payload, "all");

        res.send({
            success: true,
            message: null,
            result
        })
    }
}

