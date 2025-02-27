import { OrderStatus, Role, ShopVerifyStatus, UserGender, UserVerifyStatus } from '~/constants/enums';
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
import { ShippingDetail } from './shipping.entity';
import { ProductVariant } from './variant.entiity';
import { Shop } from './shop.entity';

@Entity('orders')
export class Order extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    shipping_channel_id: string;

    @ManyToOne(() => User, (user) => user.orders)
    @JoinColumn({ name: 'user_id' })
    user: User;

    // @OneToOne(() => PaymentDetail, (payment_detail) => payment_detail.order_id)
    // @JoinColumn({ name: "payment_id" })
    // payment: Payment

    @Column({ default: 0 })
    total: number;

    @Column({ default: 0 })
    price_before_discount: number;

    @OneToOne(() => ShippingDetail, (shipping_detail) => shipping_detail.order)
    @JoinColumn({ name: 'shipping_detail_id' })
    shipping: ShippingDetail;

    @Column({ nullable: true, type: 'text' })
    desc: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(() => OrderItem, (orderitem) => orderitem.order)
    order_items: OrderItem[];

    @ManyToOne(() => Shop, (shop) => shop.orders)
    @JoinColumn({ name: 'shop_id' })
    shop: Shop;
}

@Entity('order_items')
export class OrderItem extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ManyToOne(() => Order, (order) => order.order_items)
    @JoinColumn({ name: 'order_id' })
    order: Order;

    @ManyToOne(() => Product, (product) => product.order_items, { onDelete: 'NO ACTION' })
    @JoinColumn({ name: 'product_id' })
    product: Product;

    @ManyToOne(() => ProductVariant, (productvariant) => productvariant.order_items)
    @JoinColumn({ name: 'product_variant_id' })
    productvariant: ProductVariant;

    @Column()
    price: number;

    @Column()
    price_before_discount: number;

    @Column({ default: 1 })
    quantity: number;

    @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.Ordered })
    status: OrderStatus;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
