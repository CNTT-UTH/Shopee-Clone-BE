import { Cart } from '~/models/entity/cart.entity';
import { CartRepository } from '~/repository/cart.repository';
import { UserService } from './users.service';
import { ApiError } from '~/utils/errors';
import { USERS_MESSAGES } from '~/constants/messages';
import HTTP_STATUS from '~/constants/httpStatus';
import { CartDTO, CartItemDTO, UpdateQuantityDTO } from '~/models/dtos/cart/CartDTO';
import { ProductService } from './product.service';
import { plainToInstance } from 'class-transformer';

export class CartService {
    constructor(
        private readonly userService: UserService,
        private readonly productService: ProductService,
        private readonly cartRepository: CartRepository,
    ) {}

    async getSelectedItem(user_id: string) {
        const cart: Cart | null = await this.cartRepository.getSelectedItem(user_id);

        // return cart;
        return plainToInstance(CartDTO, cart);
    }

    async getMyCart(user_id: string) {
        const user = await this.userService.getOne(user_id);

        if (!user) throw new ApiError(USERS_MESSAGES.USER_NOT_FOUND, HTTP_STATUS.NOT_FOUND);

        const cart: Cart | null = await this.cartRepository.createOrGetCart(user);

        // return cart;
        return plainToInstance(CartDTO, cart);
    }

    async addOrUpdateItem(user_id: string, item: CartItemDTO) {
        const user = await this.userService.getOne(user_id);
        const cart = await this.cartRepository.getCart(user_id);
        const product = await this.productService.findOne({
            product_id: item.product_id,
            variant_id: item.product_variant_id,
        });

        if (!product) throw new ApiError('PRODUCT NOT FOUND!', HTTP_STATUS.NOT_FOUND);
        if (!user) throw new ApiError(USERS_MESSAGES.USER_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
        if (!cart) return null;

        const isExist: boolean = cart ? await this.cartRepository.isExist(cart, item) : false;

        const updatedCart: Cart | null = isExist
            ? await this.cartRepository.updateItem(cart, item)
            : await this.cartRepository.addItem(cart, item);

        if (!updatedCart) return null;

        return await this.updateTotal(updatedCart);
    }

    async removeItem(user_id: string, item_id: number) {
        const user = await this.userService.getOne(user_id);
        const cart = await this.cartRepository.getCart(user_id);

        if (!user) throw new ApiError(USERS_MESSAGES.USER_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
        if (!cart) return null;

        const updatedCart = await this.cartRepository.removeItem(cart, item_id);
        if (!updatedCart) return null;

        return await this.updateTotal(updatedCart);
    }

    async updateTotal(cart: Cart) {
        const [total, totalBeforeDiscount] = await this.countingPrice(cart);

        return await this.cartRepository.updateTotal(cart, [total, totalBeforeDiscount]);
    }

    async countingPrice(cart: Cart) {
        let total: number = 0;
        let totalBeforeDiscount: number = 0;

        cart.cart_items.map((item) => {
            total += item.productvariant ? item.productvariant.price : item.product.price;
            totalBeforeDiscount +=
                (item.productvariant ? item.productvariant.old_price : item.product.old_price) * item.quantity;
        });

        return [total, totalBeforeDiscount];
    }
}
