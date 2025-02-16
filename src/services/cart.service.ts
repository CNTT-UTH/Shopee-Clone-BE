import { Cart } from '~/models/entity/cart.entity';
import { CartRepository } from '~/repository/cart.repository';
import { UserService } from './users.service';
import { ApiError } from '~/utils/errors';
import { USERS_MESSAGES } from '~/constants/messages';
import HTTP_STATUS from '~/constants/httpStatus';
import { CartItemDTO } from '~/models/dtos/CartDTO';

export class CartService {
    private readonly cartRepo: CartRepository;

    constructor(private readonly userService: UserService) {
        this.cartRepo = new CartRepository();
    }

    async getMyCart(user_id: string) {
        const user = await this.userService.getOne(user_id);

        if (!user) throw new ApiError(USERS_MESSAGES.USER_NOT_FOUND, HTTP_STATUS.NOT_FOUND);

        const cart: Cart | null = await this.cartRepo.createOrGetCart(user);

        return cart;
    }

    async addItem(user_id: string, item: CartItemDTO) {
        const user = await this.userService.getOne(user_id);
        const cart = await this.cartRepo.getCart(user_id);

        if (!user) throw new ApiError(USERS_MESSAGES.USER_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
        if (!cart) return null;

        const isExist: boolean = cart ? await this.cartRepo.isExist(cart, item) : false;

        const updatedCart: Cart | null = isExist
            ? await this.cartRepo.updateItem(cart, item)
            : await this.cartRepo.addItem(cart, item);

        return updatedCart;
    }

    async removeItem(user_id: string, item_id: number) {
        const user = await this.userService.getOne(user_id);
        const cart = await this.cartRepo.getCart(user_id);

        if (!user) throw new ApiError(USERS_MESSAGES.USER_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
        if (!cart) return null;

        const updatedCart = await this.cartRepo.removeItem(cart, item_id);

        return updatedCart;
    }
}
