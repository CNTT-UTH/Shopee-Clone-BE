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
} from "typeorm";
import { Product } from "./product.entity";
import { User } from "./user.entity";

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

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
