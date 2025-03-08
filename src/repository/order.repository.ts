import { Repository } from 'typeorm';
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

    async createOrder(order: OrderDTO): Promise<Order> {
        return await this.save(order);
    }

    async updateOrder(order: Order): Promise<Order> {
        return await this.save(order);
    }

    async deleteOrder(orderId: string): Promise<void> {
        await this.delete(orderId);
    }
}
