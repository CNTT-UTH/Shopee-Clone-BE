import { Request, Response } from "express";
import { CartService } from "~/services/cart.service";

export class CartController {
    constructor(
        private readonly cartService: CartService
    ) {

    }

    async getMyCart(req: Request, res: Response) {

        const user_id: string = req?.decoded?._id as string;

        const result = await this.cartService.getMyCart(user_id);

        res.send({
            success: true,
            message: null,
            result
        })
    }
}

