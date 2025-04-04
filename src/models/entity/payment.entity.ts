import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Double,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { PaymentStatus } from '~/constants/enums';
import { Order } from './order.entity';
import { r } from 'node_modules/@faker-js/faker/dist/airline-BcEu2nRk.cjs';

@Entity('payment_methods')
export class PaymentMethods extends BaseEntity {
    @PrimaryGeneratedColumn('increment', { type: 'int' })
    id: number;

    @Column({ type: 'text' })
    name: string;
}

@Entity('payment_details')
export class PaymentDetail extends BaseEntity {
    @PrimaryGeneratedColumn('increment', { type: 'int' })
    id: number;

    @Column({ type: 'double', default: 0.0 })
    amount: number;

    @Column({ type: 'enum', enum: PaymentStatus })
    status: PaymentStatus;

    @ManyToOne(() => PaymentMethods, (p) => p.id)
    @JoinColumn({ name: 'payment_type_id' })
    type: PaymentMethods;

    @OneToOne(() => Order, (o) => o.id)
    @JoinColumn({ name: 'order_id' })
    order: Order;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
