import { Repository } from 'typeorm';
import { PaymentStatus } from '~/constants/enums';
import AppDataSource from '~/dbs/db';
import { PaymentDetail } from '~/models/entity/payment.entity';

export class PaymentRepository extends Repository<PaymentDetail> {
    constructor() {
        super(PaymentDetail, AppDataSource.manager);
    }

    async findAllMethods() {
        // return await this.createQueryBuilder('payment_methods').select().getMany();
        return await this.query('SELECT * FROM `payment_methods` WHERE 1');
    }

    async findOneMethod(id: number) {
        // return await this.createQueryBuilder('payment_methods').select().getMany();
        return await this.query(`SELECT * FROM \`payment_methods\` WHERE \`id\` = ${id}`);
    }

    async createPaymentDetail({ amount, type, order_id }: { amount: number; type: number; order_id: string }) {
        return await this.create({
            amount,
            type: {
                id: type,
            },
            order: {
                id: order_id,
            },
            status: PaymentStatus.Pending,
        }).save();
    }

    async toPurchaseSuccess(payment_id: number) {
        return await this.update(
            { id: payment_id },
            {
                status: PaymentStatus.Success,
            },
        );
    }
}
