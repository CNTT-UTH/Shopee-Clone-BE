import { Role, UserGender, UserVerifyStatus } from "~/constants/enums";
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
} from "typeorm";
import { Product } from "./product.entity";
import { User } from "./user.entity";
import { ProductVariant } from "./variant.entiity";
import { Shop } from "./shop.entity";

@Entity("carts")
export class Cart extends BaseEntity {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @OneToOne(() => User, (user) => user.cart)
    @JoinColumn({ name: "user_id" })
    user: User;

    @Column({ nullable: true, default: 0 })
    total: string;

    @Column({ nullable: true, default: 0 })
    total_before_discount: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

@Entity("cart_items")
export class CartItem extends BaseEntity {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @ManyToOne(() => Product, (product) => product.cart_items)
    @JoinColumn({ name: "product_id" })
    product: Product;

    @ManyToOne(() => ProductVariant, (productvariant) => productvariant.cart_items)
    @JoinColumn({ name: "product_variant_id" })
    productvariant: ProductVariant;

    @ManyToOne(() => Shop, (shop) => shop.cart_items)
    @JoinColumn({ name: "shop_id" })
    shop: Shop;

    @Column({ default: 1 })
    quantity: number;

    @Column({ default: false })
    selected_to_checkout: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
