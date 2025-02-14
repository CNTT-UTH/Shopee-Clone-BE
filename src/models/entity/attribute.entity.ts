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
    PrimaryColumn,
    ManyToOne,
    JoinColumn,
    ManyToMany,
    JoinTable,
} from 'typeorm';
import { Product } from './product.entity';
import { Option } from './variant.entiity';
import { Category } from './category.entity';

@Entity('attributes')
export class Attribute extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToMany(() => Category, (cate) => {cate.cate_id})
    @JoinTable({name: 'attribute_category'})
    cates: Category[];
}

@Entity('attribute_values')
export class AttributeValue extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    value: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => Attribute, (attribute) => attribute.id, {
        cascade: true,
    })
    @JoinColumn({ name: 'attribute_id' })
    attribute: Attribute;

    @ManyToOne(() => Product, (product) => product.attributes, {
        cascade: true,
    })
    @JoinColumn({ name: 'product_id' })
    product: Product;
}
