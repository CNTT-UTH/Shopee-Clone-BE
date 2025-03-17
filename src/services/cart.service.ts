import { Cart } from '~/models/entity/cart.entity';
import { CartRepository } from '~/repository/cart.repository';
import { UserService } from './users.service';
import { ApiError } from '~/utils/errors';
import { USERS_MESSAGES } from '~/constants/messages';
import HTTP_STATUS from '~/constants/httpStatus';
import { CartDTO, CartItemDTO } from '~/models/dtos/cart/CartDTO';
import { ProductService } from './product.service';
import { plainToInstance } from 'class-transformer';
import { Product } from '~/models/entity/product.entity';
import { ProductVariant } from '~/models/entity/variant.entity';
import { OrderService } from './order.service';
import { redis } from '~/utils/redis';

export class CartService {
    constructor(
        private readonly userService: UserService,
        private readonly productService: ProductService,
        private readonly cartRepository: CartRepository,
    ) { }

    async getSelectedItem(user_id: string) {
        const cart: Cart | null = await this.cartRepository.getSelectedItem(user_id);

        // return cart;
        return plainToInstance(CartDTO, cart);
    }

    async getMyCart(user_id: string) {
        const cartCache = await redis.hGet(`user:${user_id}`, `cart`);
        if (cartCache) return JSON.parse(cartCache);
        
        const user = await this.userService.getOne(user_id);

        if (!user) throw new ApiError(USERS_MESSAGES.USER_NOT_FOUND, HTTP_STATUS.NOT_FOUND);


        const cart: Cart | null = await this.cartRepository.createOrGetCart(user);
        const cartDTO: CartDTO = plainToInstance(CartDTO, cart);
        await redis.hSet(`user:${user_id}`, `cart`, JSON.stringify(cartDTO));

        // return cart;
        return cartDTO;
    }

    async addOrUpdateItem(user_id: string, item: CartItemDTO) {
        const user = await this.userService.getOne(user_id);
        const cart = await this.cartRepository.getCart(user_id);
        const product: Product | ProductVariant | null = item.product_variant_id
            ? await this.productService.findOneVariant({
                product_id: item.product_id,
                variant_id: item.product_variant_id,
            })
            : await this.productService.findOne({
                product_id: item.product_id,
            });

        if (!product) throw new ApiError('PRODUCT NOT FOUND!', HTTP_STATUS.NOT_FOUND);
        if (!user) throw new ApiError(USERS_MESSAGES.USER_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
        if (!cart) return null;

        // Xoa don hang da duoc tao tam thoi
        OrderService.clearSessionStorage(user_id);

        const isExist: boolean = cart ? await this.cartRepository.isExist(cart, item) : false;

        if (product.quantity < item.quantity) {
            throw new ApiError('Loi so luong vuot qua ton kho!', HTTP_STATUS.NOT_FOUND);
        }

        const updatedCart: Cart | null = isExist
            ? await this.cartRepository.updateItem(cart, item)
            : await this.cartRepository.addItem(cart, item);

        if (!updatedCart) return null;

        const cartAfterUpdateTotal = plainToInstance(CartDTO, await this.updateTotal(updatedCart));
        await redis.hDel(`user:${user_id}`, `cart`);

        return cartAfterUpdateTotal;
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
            total += (item.productvariant ? item.productvariant.price : item.product.price) * item.quantity;
            totalBeforeDiscount +=
                (item.productvariant ? item.productvariant.old_price : item.product.old_price) * item.quantity;
        });

        return [total, totalBeforeDiscount];
    }
}
