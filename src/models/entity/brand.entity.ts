import { Role, UserGender, UserVerifyStatus } from '~/constants/enums';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    BaseEntity,
    OneToMany,
    OneToOne,
} from 'typeorm';
import { Product } from './product.entity';

@Entity('brands')
export class Brand extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    _id: string;

    @Column()
    name: string;

    @Column({ nullable: true })
    image_url: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(() => Product, (product) => product.brand)
    products: Product[];
}
