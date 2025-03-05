import { PaymentRepository } from '~/repository/payment.repository';

export class PaymentService {
    constructor(private readonly paymentRepository: PaymentRepository) { }

    async findAll() {
        return await this.paymentRepository.findAllMethods();
    }

    async findOne(payment_id: string){
    }
}
