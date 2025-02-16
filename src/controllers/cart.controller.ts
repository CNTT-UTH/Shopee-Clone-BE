import { Request, Response } from "express";
import cartService from "~/services/cart.service";
class CartController {

     async getMyCart(req: Request, res: Response) {
          
          const user_id: string = req?.decoded?._id as string;

          const result = await cartService.getMyCart(user_id);

          res.send( {
               success: true,
               message: null,
               result
          })
     }
}

export default new CartController();