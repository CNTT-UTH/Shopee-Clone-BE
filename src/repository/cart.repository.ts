import { Repository } from 'typeorm';
import AppDataSource from '~/dbs/db';
import { CartItemDTO } from '~/models/dtos/cart/CartDTO';
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

    async updatePrice({
        cartItemID,
        product_id,
        variant_id,
    }: {
        cartItemID?: number;
        product_id?: number;
        variant_id?: number;
    }) {
        const item: CartItem | null = await this.itemRepo.findOne({
            where: [
                { id: cartItemID },
                {
                    product: {
                        _id: product_id,
                    },
                    productvariant: {
                        variant_id,
                    },
                },
            ],
            relations: ['product', 'productvariant'],
        });

        if (!item) return;

        await this.itemRepo.update(
            {
                id: item.id,
            },
            {
                price: item.productvariant ? item.productvariant.price : item.product.price,
                price_before_discount: item.productvariant ? item.productvariant.old_price : item.product.old_price,
                total_price: (item.productvariant ? item.productvariant.price : item.product.price) * item.quantity,
            },
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
                block_id: item.shop_id,
                product: {
                    _id: item.product_id,
                },
                quantity: item.quantity,
                selected_to_checkout: false,
                price: 0,
                price_before_discount: 0,
                total_price: 0,
            })
            .save();

        await this.updatePrice({ product_id: item.product_id, variant_id: item.product_variant_id });

        return this.getCartById(cart.id);
    }

    async updateItem(cart: Cart, item: CartItemDTO) {
        const cartItem = await this.itemRepo.update(
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

        await this.updatePrice({ product_id: item.product_id, variant_id: item.product_variant_id });

        return this.getCartById(cart.id);
    }

    async updateItemByItemId(cart: Cart, item: CartItemDTO) {
        await this.itemRepo.update(
            {
                cart_id: cart.id,
            },
            {
                quantity: item.quantity,
                selected_to_checkout: item.selected_to_checkout,
            },
        );
        await this.updatePrice({ product_id: item.product_id, variant_id: item.product_variant_id });

        return this.getCartById(cart.id);
    }

    async removeItem(cart: Cart, item_id: number) {
        await this.itemRepo.delete({ id: item_id });

        return await this.getCartById(cart.id);
    }

    async updateTotal(cart: Cart, [total, total_before_discount]: number[]) {
        await this.cartRepo.update({ id: cart.id }, { total: total, total_before_discount: total_before_discount });

        return await this.getCartById(cart.id);
    }

    async getSelectedItem(user_id: string) {
        return await this.cartRepo
            .createQueryBuilder('carts')
            .leftJoinAndSelect('carts.cart_items', 'cart_items')
            .leftJoinAndSelect('cart_items.product', 'products')
            .leftJoinAndSelect('cart_items.productvariant', 'product_variants')
            .leftJoinAndSelect('cart_items.shop', 'shops')
            .select()
            .where('carts.user_id = :user_id AND selected_to_checkout = true', { user_id })
            // .groupBy('cart_items.block_id')
            .getOne();

        // relations: ['cart_items', 'cart_items.product', 'cart_items.productvariant', 'cart_items.shop'],
    }
}
