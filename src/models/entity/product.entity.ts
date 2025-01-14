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

@Entity("products")
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn("increment")
    _id: number;

    @Column()
    title: string;

    @Column({ nullable: true, type: "text", width: 65535 })
    description: string;

    @Column({ nullable: true, type: "text", width: 65535 })
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
}
