import { Repository } from 'typeorm';
import { OrderCheckout } from '~/models/dtos/order/checkout';
import { OrderDTO } from '~/models/dtos/order/OrderDTO';
import { Order } from '~/models/entity/order.entity';

export class OrderRepository extends Repository<Order> {
    async getOrderById(orderId: string): Promise<Order | null> {
        return await this.findOne({ where: { id: orderId } });
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

    async createOrder(order: OrderCheckout, user_id: string): Promise<Order> {
        return await this.create({
            user: { _id: user_id },
            total: order.total_items_price,
            // price_before_discount: order.total_items_price,
            shipping: order.shipping_info[order.shipping_channel_id_selected],
            desc: order.notes,
            order_items: order.items.map((i) => ({
                product: { _id: i.product_id },
                variant: { _id: i.variant_id },
                quantity: i.quantity,
                price: i.price,
            })),
        }).save();
    }

    async updateOrder(order: Order): Promise<Order> {
        return await this.save(order);
    }

    async deleteOrder(orderId: string): Promise<void> {
        await this.delete(orderId);
    }
}
