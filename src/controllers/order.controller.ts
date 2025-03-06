import { Request, Response } from "express";
import HTTP_STATUS from "~/constants/httpStatus";
import { OrderService } from "~/services/order.service";
import { ApiError } from "~/utils/errors";

export class OrderController {

    constructor(private readonly orderService: OrderService){};

    async handleCheckout(req: Request, res: Response){
        if (!req.decoded?._id) throw new ApiError("Lỗi người dùng", HTTP_STATUS.BAD_REQUEST);

        const user_id: string = req.decoded?._id;

        const result = await this.orderService.handleCheckout(user_id);

        res.json({
            success: true,
            message: null,
            result
        });
    }
}