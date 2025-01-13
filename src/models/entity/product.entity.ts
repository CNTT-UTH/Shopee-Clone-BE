import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

    @Column()
    category_id: number;

    @Column()
    quantity: number;
}
