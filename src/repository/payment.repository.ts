import { Repository } from "typeorm";
import AppDataSource from "~/dbs/db";
import { PaymentDetails } from "~/models/entity/payment.entity";

export class PaymentRepository extends Repository<PaymentDetails>{
    constructor(){
        super(PaymentDetails, AppDataSource.manager);
    }

    async findAllMethods(){
        // return await this.createQueryBuilder('payment_methods').select().getMany();
        return await this.query('SELECT * FROM `payment_methods` WHERE 1');
    }


}