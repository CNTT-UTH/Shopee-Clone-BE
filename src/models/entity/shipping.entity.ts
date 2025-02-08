import { Role, ShopVerifyStatus, UserGender, UserVerifyStatus } from '~/constants/enums';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    BaseEntity,
    OneToMany,
    OneToOne,
    JoinColumn,
    ManyToOne,
} from 'typeorm';
import { Address } from './address.entity';
import { Cart, CartItem } from './cart.entity';
import { User } from './user.entity';
import { Product } from './product.entity';
import { Order } from './order.entity';

@Entity('shippings')
export class Shipping extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    shipping_channel_id: number;

    @Column()
    name: string;

    @Column({ nullable: true, type: 'text' })
    desc: string;

    @OneToMany(() => ShippingDetail, (shipping_detail) => shipping_detail.shipping_channel)
    shipping_details: ShippingDetail[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

@Entity('shipping_details')
export class ShippingDetail extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: string;

    @ManyToOne(() => Shipping, (shipping) => shipping.shipping_details)
    @JoinColumn({ name: 'shipping_channel_id' })
    shipping_channel: Shipping;

    @OneToOne(() => Order, (order) => order.shipping)
    @JoinColumn({ name: 'order_id' })
    order: Order;

    @Column({ default: 0 })
    fee: number;

    @OneToOne(() => Address, (address) => address.id)
    @JoinColumn({ name: 'address_id' })
    address: Address;

    @Column({ type: 'text' })
    note_for_shipper: string;

    @Column()
    estimated_delivery_date_from: Date;

    @Column()
    estimated_delivery_date_to: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
