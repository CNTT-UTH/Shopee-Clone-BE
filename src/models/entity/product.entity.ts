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
} from "typeorm";
import { Category } from "./category.entity";
import { Brand } from "./brand.entity";
import { Image } from "./image.entity";
import { Option } from "./variant.entiity";
import { AttributeValue } from "./attribute.entity";
import { CartItem } from "./cart.entity";
import { Shop } from "./shop.entity";
import { OrderItem } from "./order.entity";

@Entity("products")
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn("increment")
    _id: number;

    @Column()
    title: string;

    @Column()
    sku: string;

    @Column({ nullable: true, type: "text"})
    description: string;

    @Column({ nullable: true, type: "text"})
    specification: string;

    @Column({ nullable: false })
    category_id: number;

    @Column({ nullable: true, default: 0 })
    quantity: number;

    @Column({ nullable: true, default: 0 })
    old_price: number;

    @Column({ nullable: true, default: 0 })
    price: number;

    @Column({ nullable: true, default: 0 })
    range_min_price: number;

    @Column({ nullable: true, default: 0 })
    range_max_price: number;

    @Column({ nullable: true, default: 0 })
    buyturn: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToMany(() => Category, (category) => category.cate_id)
    @JoinTable()
    categories: Category[];

    @ManyToOne(() => Brand, (brand) => brand.products)
    @JoinColumn({ name: "brand_id" })
    brand: Brand;

    @OneToMany(() => Image, (image) => image.product)
    images: Image;

    @OneToMany(() => Option, (option) => option.product)
    options: Option[];

    @OneToMany(() => AttributeValue, (attribute_value) => attribute_value.product)
    attributes: AttributeValue[];

    @OneToMany(() => CartItem, (cartitem) => cartitem.product)
    cart_items: CartItem[];

    @OneToMany(() => OrderItem, (orderitem) => orderitem.product)
    order_items: OrderItem[];

    @ManyToOne(() => Shop, (shop) => shop.products)
    @JoinColumn({ name: "shop_id" })
    shop: Shop;

}
