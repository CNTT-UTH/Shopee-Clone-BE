import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { Brand } from './brand.entity';
import { Image } from './image.entity';
import { Option, ProductVariant } from './variant.entity';
import { AttributeValue } from './attribute.entity';
import { CartItem } from './cart.entity';
import { Shop } from './shop.entity';
import { OrderItem } from './order.entity';
import { Shipping, ShippingProductInfo } from './shipping.entity';

@Entity('products')
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    _id: number;

    @Column()
    title: string;

    @Column()
    sku: string;

    @Column({ nullable: true, type: 'text' })
    description: string;

    @Column({ nullable: true, type: 'text' })
    specification: string;

    @Column({ nullable: false })
    category_id: number;

    @Column({ nullable: true, default: 0 })
    quantity: number;

    @Column({ type: 'double', default: 0.0 })
    price: number;

    @Column({ type: 'double', default: 0.0 })
    old_price: number;

    @Column({ type: 'double', default: 0.0 })
    price_range_min: number;

    @Column({ type: 'double', default: 0.0 })
    price_range_max: number;

    @Column({ type: 'double', default: 0.0 })
    price_range_min_old: number;

    @Column({ type: 'double', default: 0.0 })
    price_range_max_old: number;

    @Column({ nullable: true, default: 0, type: 'float' })
    discount: number;

    @Column({ nullable: true, default: 0 })
    buyturn: number;

    @Column({ type: 'double', default: 0.0 })
    weight: number;
    @Column({ type: 'double', default: 0.0 })
    width: number;
    @Column({ type: 'double', default: 0.0 })
    height: number;
    @Column({ type: 'double', default: 0.0 })
    length: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToMany(() => Category, (category) => category.cate_id, { onDelete: 'CASCADE' })
    @JoinTable()
    categories: Category[];

    @ManyToOne(() => Brand, (brand) => brand.products)
    @JoinColumn({ name: 'brand_id' })
    brand: Brand;

    @Column({ nullable: true, type: 'text' })
    image: string;

    @OneToMany(() => Image, (image) => image.product)
    images: Image[];

    @ManyToMany(() => Option, (option) => option.product)
    @JoinTable({
        name: 'product_options',
        joinColumns: [{ name: 'product_id', referencedColumnName: '_id' }],
        inverseJoinColumns: [{ name: 'option_id', referencedColumnName: 'id' }],
    })
    options: Option[];

    @OneToMany(() => ProductVariant, (variant) => variant.product, { cascade: true })
    variants: ProductVariant[];

    @OneToMany(() => AttributeValue, (attribute_value) => attribute_value.product)
    attributes: AttributeValue[];

    @OneToMany(() => CartItem, (cartitem) => cartitem.product)
    cart_items: CartItem[];

    @OneToMany(() => OrderItem, (orderitem) => orderitem.product)
    order_items: OrderItem[];

    @ManyToOne(() => Shop, (shop) => shop.products, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'shop_id' })
    shop: Shop;

    @OneToMany(() => ShippingProductInfo, (shipping) => shipping.product)
    shipping_channels: ShippingProductInfo[];
}
