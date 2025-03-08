import { Request, Response } from 'express';
import { PaymentService } from '~/services/payment.service';

export class PaymentController {
    constructor(private readonly paymentService: PaymentService) {}

    async getAllMethods(req: Request, res: Response) {
        const result = await this.paymentService.findAllMethods();

        res.json({
            suscess: true,
            message: null,
            result,
        });
    }
}
