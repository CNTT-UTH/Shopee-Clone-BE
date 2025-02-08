import { Role, ShopVerifyStatus, UserGender, UserVerifyStatus } from '~/constants/enums';
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
} from 'typeorm';
import { Address } from './address.entity';
import { Cart, CartItem } from './cart.entity';
import { User } from './user.entity';
import { Product } from './product.entity';
import { Order } from './order.entity';

// export interface UserType {
//     _id?: string;
//     name?: string;
//     email?: string;
//     dob?: Date;
//     password?: string;
//     created_at?: Date;
//     updated_at?: Date;
//     email_verify_token?: string;
//     verify_status?: string;
//     forgot_password_token?: string;
//     verify?: UserVerifyStatus;
//     avatar?: string;
// }

@Entity('shops')
export class Shop extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @OneToOne(() => User, (user) => user._id)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column({ nullable: true, type: 'text' })
    description: string;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    phone: string;

    @Column({ type: 'enum', enum: ShopVerifyStatus, default: ShopVerifyStatus.Unverified })
    status: ShopVerifyStatus;

    @Column({ nullable: true, type: 'text' })
    avatar?: string;

    @Column({ nullable: true })
    last_time_active: Date;

    @Column({ nullable: true })
    default_address_id: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(() => Address, (address) => address.user)
    addresses: Address[];

    @OneToMany(() => Product, (product) => product.shop)
    products: Product[];

    @OneToMany(() => CartItem, (cartitem) => cartitem.shop)
    cart_items: CartItem[];

    @OneToMany(() => Order, (order) => order.shop)
    orders: Order[];
}
