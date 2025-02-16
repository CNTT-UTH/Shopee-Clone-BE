import { Repository } from 'typeorm';
import AppDataSource from '~/dbs/db';
import { CartItemDTO } from '~/models/dtos/CartDTO';
import { Cart, CartItem } from '~/models/entity/cart.entity';
import { User } from '~/models/entity/user.entity';

export class CartRepository {
    private cartRepo: Repository<Cart>;
    private itemRepo: Repository<CartItem>;

    constructor() {
        this.cartRepo = AppDataSource.getRepository(Cart);
        this.itemRepo = AppDataSource.getRepository(CartItem);
    }

    async createOrGetCart(user: User) {
        const isExist = await this.cartRepo.findOneBy({ user: { _id: user._id } });
        if (isExist) return this.getCart(user._id);
        const newCart = await this.cartRepo.create({ user: user }).save();

        return this.getCart(user._id);
    }

    async getCart(user_id: string) {
        const result = await this.cartRepo.findOne({
            where: {
                user: {
                    _id: user_id,
                },
            },
            relations: ['cart_items', 'cart_items.product', 'cart_items.productvariant', 'cart_items.shop'],
        });

        // const result = await this.cartRepo
        //     .createQueryBuilder('carts')
        //     .leftJoinAndSelect('carts.cart_items', 'cart_items')
        //     // .leftJoinAndSelect('cart_items', 'cart_items.product')
        //     .select([
        //         'carts.id',
        //         'carts.total',
        //         'carts.total_before_discount',
        //         'cart_items.id',
        //         'cart_items.quantity',
        //         'cart_items.selected_to_checkout',
        //         // 'product._id',
        //     ])
        //     .where('carts.user_id = :user_id', { user_id })
        //     .getOne();

        return result;
    }

    async getCartById(id: number) {
        const result = await this.cartRepo.findOne({
            where: {
                id,
            },
            relations: ['cart_items', 'cart_items.product', 'cart_items.productvariant', 'cart_items.shop'],
        });

        return result;
    }

    async isExist(cart: Cart, item: CartItemDTO) {
        return (
            (await this.itemRepo.findOneBy({
                cart_id: cart.id,
                product: {
                    _id: item.product_id,
                },
                productvariant: {
                    variant_id: item.product_variant_id,
                },
            })) !== null
        );
    }

    async addItem(cart: Cart, item: CartItemDTO) {
        await this.itemRepo
            .create({
                cart_id: cart.id,
                productvariant: {
                    variant_id: item.product_variant_id,
                },
                shop: {
                    id: item.shop_id,
                },
                product: {
                    _id: item.product_id,
                },
                quantity: item.quantity,
                selected_to_checkout: false,
            })
            .save();

        return this.getCartById(cart.id);
    }

    async updateItem(cart: Cart, item: CartItemDTO) {
        await this.itemRepo.update(
            {
                cart_id: cart.id,
                productvariant: {
                    variant_id: item.product_variant_id,
                },
                product: {
                    _id: item.product_id,
                },
            },
            {
                quantity: item.quantity,
                selected_to_checkout: item.selected_to_checkout,
            },
        );

        return this.getCartById(cart.id);
    }

    async removeItem(cart: Cart, item_id: number) {
        await this.itemRepo.delete({ id: item_id });

        return await this.getCartById(cart.id);
    }
}
