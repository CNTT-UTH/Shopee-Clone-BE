import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Product } from './product.entity';

@Entity('categories')
export class Category extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    cate_id: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    parent_cate_id: number;

    @Column({ nullable: false })
    level: number;

    @Column({ nullable: true })
    image_url: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToMany(() => Product, (product) => product.category_id)
    products: Product[];
}
