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
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { Product } from './product.entity';
import { User } from './user.entity';
import { Shop } from './shop.entity';

@Entity('addresses')
export class Address extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    city: string;

    @Column()
    district: string;

    @Column()
    ward: string;

    @Column()
    address_line: string;

    @Column()
    phone_number: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => User, (user) => user.addresses, { cascade: true, onDelete: "CASCADE" })
    @JoinColumn({ name: 'user' })
    user: User;

    @ManyToOne(() => Shop, (shop) => shop.addresses, { cascade: true, onDelete: "CASCADE" })
    @JoinColumn({ name: 'shop' })
    shop: Shop;
}
