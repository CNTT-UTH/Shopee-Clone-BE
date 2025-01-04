import { UserVerifyStatus } from "~/constants/enums";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity } from "typeorm";

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

    @Column({ nullable: true })
    name: string;

    @Column()
    email: string;

    @Column({ nullable: true })
    dob: Date;

    @Column()
    username: string;

    @Column({ nullable: false, type: "text", width: 65535 })
    password: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Column({ nullable: false })
    role: number;

    @Column({ nullable: true, type: "text", width: 65535 })
    email_verify_token?: string;

    @Column({ nullable: true, type: "text", width: 65535 })
    refresh_token?: string;

    @Column({ nullable: true, type: "text", width: 65535 })
    refresh_token_mobile?: string;

    @Column({ nullable: true, type: "text", width: 65535 })
    forgot_password_token?: string;

    @Column({ type: "enum", enum: UserVerifyStatus, default: UserVerifyStatus.Unverified })
    verify: UserVerifyStatus;

    @Column({ nullable: true, type: "text", width: 65535 })
    avatar?: string;

    // create(user: UserType) {
    //     const date = new Date();

    //     this._id = user._id;
    //     this.name = user.name || "";
    //     this.email = user.email;
    //     this.dob = user.dob || new Date();
    //     this.password = user.password;
    //     this.created_at = user.created_at || date;
    //     this.updated_at = user.updated_at || date;
    //     this.email_verify_token = user.email_verify_token || "";
    //     this.forgot_password_token = user.forgot_password_token || "";
    //     this.verify = user.verify || UserVerifyStatus.Unverified;
    //     this.avatar = user.avatar || "";
    // }
}
