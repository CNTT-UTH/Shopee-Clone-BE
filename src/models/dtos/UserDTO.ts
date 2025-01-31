import { AddressDTO } from "./AddressDTO";
import { Expose, Type, Transform, Exclude } from "class-transformer";

@Exclude()
export class UserDTO {
    @Expose({ name: "_id" })
    user_id?: string;

    @Expose()
    username?: string;

    @Expose()
    email?: string;

    @Expose()
    name?: string;

    @Expose()
    @Transform(({ value }) => value?.getTime())
    dob?: number; // Timestamp in milliseconds

    @Expose()
    gender?: number; // 0: Nam, 1: Nữ, 2: Khác

    @Expose()
    phone?: string; // format : +84...

    @Expose()
    is_shop?: boolean;

    @Expose({ name: "verify" })
    status?: number; // 0: Chưa xác nhận mail, 1: Đã xác thực, 2: Banned

    @Expose()
    @Type(() => AddressDTO)
    default_address?: AddressDTO;

    @Expose()
    avatar?: string;

    // constructor(data: Partial<UserDTO>) {
    //     this.user_id = data.user_id;
    //     this.username = data.username;
    //     this.email = data.email;
    //     this.name = data.name;
    //     this.dob = data.dob;
    //     this.gender = data.gender;
    //     this.phone = data.phone;
    //     this.is_shop = data.is_shop;
    //     this.status = data.status;
    //     this.defaut_address = data.defaut_address;
    // }
}
