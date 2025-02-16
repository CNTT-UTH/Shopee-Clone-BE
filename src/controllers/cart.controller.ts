import { Request, Response } from 'express';
import { CartItemDTO } from '~/models/dtos/CartDTO';
import { CartService } from '~/services/cart.service';

export class CartController {
    constructor(private readonly cartService: CartService) {}

    async getMyCart(req: Request, res: Response) {
        const user_id: string = req?.decoded?._id as string;

        const result = await this.cartService.getMyCart(user_id);

        res.send({
            success: true,
            message: null,
            result,
        });
    }

    async addItem(req: Request, res: Response) {
        const user_id: string = req?.decoded?._id as string;
        const item: CartItemDTO = req.body;

        const result = await this.cartService.addItem(user_id, item);

        res.send({
            success: true,
            message: null,
            result,
        });
    }

    async removeItem(req: Request, res: Response) {
        const user_id: string = req?.decoded?._id as string;
        const item_id: number = Number(req?.body.item_id);

        const result = await this.cartService.removeItem(user_id, item_id);

        res.send({
            success: true,
            message: null,
            result,
        });
    }
}
