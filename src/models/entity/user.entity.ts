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
import { Address } from "./address.entity";
import { Cart } from "./cart.entity";

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

@Entity("users")
export class User extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    _id: string;

    @Column()
    username: string;

    @Column({ nullable: false, type: "text", width: 65535 })
    password: string;

    @Column({ nullable: true })
    name: string;

    @Column()
    email: string;

    @Column({ nullable: true })
    dob: Date;

    @Column({ nullable: true })
    phone: string;

    @Column({ nullable: false, type: "enum", enum: UserGender, default: UserGender.Unknown })
    gender: UserGender;

    @Column({ nullable: false, default: false })
    isShop: boolean;

    @Column({ nullable: false, type: "enum", enum: Role, default: Role.User })
    role: Role;

    @Column({ nullable: true, type: "text", width: 65535 })
    refresh_token?: string;

    @Column({ nullable: true, type: "text", width: 65535 })
    refresh_token_mobile?: string;

    @Column({ type: "enum", enum: UserVerifyStatus, default: UserVerifyStatus.Unverified })
    verify: UserVerifyStatus;

    @Column({ nullable: true, type: "text", width: 65535 })
    avatar?: string;

    @Column({ nullable: true })
    default_address_id: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(() => Address, (address) => address.user)
    addresses: Address[];

    @OneToOne(() => Cart, (cart) => cart.user)
    @JoinColumn({ name: "cart_id" })
    cart: Cart;
}
