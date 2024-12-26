import { UserVerifyStatus } from "~/constants/enums";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity } from "typeorm";

export interface UserType {
    _id?: string;
    name: string;
    email: string;
    dob: Date;
    password: string;
    created_at?: Date;
    updated_at?: Date;
    email_verify_token?: string;
    forgot_password_token?: string;
    verify?: UserVerifyStatus;
    avatar?: string;
}

@Entity("users")
export class User extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    _id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    dob: Date;

    @Column()
    password: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Column({ nullable: true })
    email_verify_token?: string;

    @Column({ nullable: true })
    forgot_password_token?: string;

    @Column({ type: "enum", enum: UserVerifyStatus, default: UserVerifyStatus.Unverified })
    verify: UserVerifyStatus;

    @Column({ nullable: true })
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

