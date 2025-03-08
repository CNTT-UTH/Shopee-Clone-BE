import { PaymentRepository } from '~/repository/payment.repository';

export class PaymentService {
    constructor(private readonly paymentRepository: PaymentRepository) {}

    async findAllMethods() {
        return await this.paymentRepository.findAllMethods();
    }

    async findOneMethod(payment_id: number) {
        return await this.paymentRepository.findOneMethod(payment_id);
    }
}
