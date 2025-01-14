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
    PrimaryColumn,
    ManyToOne,
    JoinColumn,
} from "typeorm";
import { Product } from "./product.entity";

@Entity("images")
export class Image extends BaseEntity {
    @PrimaryColumn()
    image_url: string;

    // @Column()
    // product_id: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => Product, (product) => product.images, {
        cascade: true,
    })
    @JoinColumn({ name: "product_id" })
    product: Product;
}
