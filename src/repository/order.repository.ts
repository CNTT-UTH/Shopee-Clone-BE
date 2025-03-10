import { Or, Repository } from 'typeorm';
import { OrderStatus } from '~/constants/enums';
import AppDataSource from '~/dbs/db';
import { OrderCheckout } from '~/models/dtos/order/checkout';
import { OrderDTO } from '~/models/dtos/order/OrderDTO';
import { Order, OrderItem } from '~/models/entity/order.entity';

export class OrderRepository extends Repository<Order> {
    private readonly orderItemRepository: Repository<OrderItem>;

    constructor() {
        super(Order, AppDataSource.manager);
        this.orderItemRepository = AppDataSource.getRepository(OrderItem);
    }

    async getOrderById(order_id: string): Promise<Order | null> {
        const items: OrderItem[] = await this.orderItemRepository
            .createQueryBuilder('item')

            .leftJoin('item.product', 'product')
            .addSelect(['product.id', 'product.title', 'product.image'])

            .leftJoin('item.productvariant', 'variant')
            .addSelect(['variant.variant_id', 'variant.name'])

            .where('item.order_id = :order_id', { order_id })
            .select()
            .getMany();

        const order: Order | null = await this.createQueryBuilder('o')
            .leftJoinAndSelect('o.payment', 'payment')
            .leftJoinAndSelect('o.shipping', 'shipping')
            .leftJoinAndSelect('o.delivery_tracking', 'tracking')

            .leftJoin('o.shop', 'shop')
            .addSelect(['shop.id', 'shop.name', 'shop.avatar'])

            .where('o.id = :order_id', { order_id })
            .select()
            .getOne();

        if (order) {
            order.order_items = items;
        }

        return order;
    }

    async getOrderByUserId(userId: string): Promise<Order[]> {
        return await this.find({
            where: {
                user: {
                    _id: userId,
                },
            },
        });
    }

    async createOrderItem({
        order_id,
        product_id,
        variant_id,
        price,
        totalprice,
        quantity,
    }: {
        order_id: string;
        product_id: number;
        variant_id?: number;
        price: number;
        totalprice: number;
        quantity: number;
    }) {
        return await this.orderItemRepository
            .create({
                order: {
                    id: order_id,
                },
                product: {
                    _id: product_id,
                },
                productvariant: {
                    variant_id,
                },
                price,
                totalprice,
                quantity,
            })
            .save();
    }

    async createOrder(order: OrderCheckout, user_id: string): Promise<Order> {
        return await this.create({
            user: { _id: user_id },
            shop: { id: order.shop_id },
            total: Number(order.total_items_price) + Number(order.ship_fee),
            total_product: Number(order.total_items_price),
            // desc: order.notes,
        }).save();
    }

    async updateOrder(order: Order): Promise<Order> {
        return await this.save(order);
    }

    async deleteOrder(order_id: string): Promise<void> {
        await this.delete(order_id);
    }

    async updateOrderStatus(order_id: string, status: OrderStatus) {
        return await this.update(
            { id: order_id },
            {
                status,
            },
        );
    }
}

