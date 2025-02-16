import { Cart } from "~/models/entity/cart.entity";
import { CartRepository } from "~/repository/cart.repository";

export class CartService {
     private readonly cartRepo: CartRepository

     constructor(

     ) {
          this.cartRepo = new CartRepository();
     }

     async getMyCart(user_id: string) {
          const cart: Cart | null = await this.cartRepo.getCart(user_id);

          return cart;
     }
}

