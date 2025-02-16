import { Repository } from "typeorm";
import AppDataSource from "~/dbs/db";
import { Cart, CartItem } from "~/models/entity/cart.entity";
import { User } from "~/models/entity/user.entity";

export class CartRepository {
     private cartRepo: Repository<Cart>;
     private itemRepo: Repository<CartItem>;

     constructor() {
          this.cartRepo = AppDataSource.getRepository(Cart);
          this.itemRepo = AppDataSource.getRepository(CartItem);
     }

     async createCart(user: User) {
         
          const isExist = await this.cartRepo.findOneBy({ user: { _id: user._id } }); 
          if (isExist) return this.getCart(user._id);
          const newCart = await this.cartRepo.create({user: user}).save();

          return newCart;
     }

     async getCart(user_id: string) {
          const result = await this.cartRepo.findOne({
               where: {
                    user: {
                         _id: user_id
                    }
               },
               relations: ["cart_items"]
          })

          return result;
     }
}
