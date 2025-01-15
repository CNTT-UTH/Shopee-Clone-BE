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
    PrimaryColumn,
    PrimaryGeneratedColumn,
    Unique,
    UpdateDateColumn,
} from "typeorm";
import { Product } from "./product.entity";
import { CartItem } from "./cart.entity";

@Entity("options")
export class Option extends BaseEntity {
    @PrimaryGeneratedColumn("increment")
    id: number;

    // @Column()
    // product_id: number;

    @Column()
    name: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => Product, (product) => product._id, {
        cascade: true,
    })
    @JoinColumn({ name: "product_id" })
    product: Product;

    @OneToMany(() => OptionValue, (optionvalue) => optionvalue.option)
    values: OptionValue[];
}

@Entity("option_values")
export class OptionValue extends BaseEntity {
    @PrimaryGeneratedColumn("increment")
    value_id: number;

    @Column()
    value_name: string;

    @Column({ nullable: true })
    image_url: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => Option, (option) => option.values, { cascade: true })
    @JoinColumn({ name: "option_id", referencedColumnName: "id" })
    option: Option;

    @ManyToMany(() => ProductVariant, (product_variant) => product_variant.options)
    variants: ProductVariant[];
}

@Entity("product_variants")
export class ProductVariant extends BaseEntity {
    @PrimaryGeneratedColumn("increment")
    variant_id: number;

    @Column()
    sku: string;

    @Column({ nullable: true, default: 0 })
    quantity: number;

    @Column({ nullable: true, default: 0 })
    buyturn: number;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    price: string;

    @Column({ nullable: false })
    old_price: string;

    @Column({ nullable: true })
    image_url: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => Product, (product) => product._id)
    @JoinColumn({ name: "product_id" })
    product: Product;

    @ManyToMany(() => OptionValue, (option_value) => option_value.variants)
    @JoinTable({
        name: "variant_option_values",
        joinColumns: [{ name: "variant_id", referencedColumnName: "variant_id" }],
        inverseJoinColumns: [{ name: "value_id", referencedColumnName: "value_id" }],
    })
    options: OptionValue[];

    @OneToMany(() => CartItem, (cartitem) => cartitem.product)
    cart_items: CartItem[];
}
