import { AddressDTO } from "./AddressDTO";

export class UserDTO {
    user_id?: string;
    username?: string;
    email?: string;
    name?: string;
    dob?: string; // timestamp
    gender?: number; // 0: Nam, 1: Nữ, 2: Khác
    phone?: string;
    is_shop?: boolean;
    status?: number; // 0: Chưa xác nhận mail, 1: Đã xác thực, 2: Banned
    defaut_address?: AddressDTO;

    constructor(data: Partial<UserDTO>) {
        this.user_id = data.user_id;
        this.username = data.username;
        this.email = data.email;
        this.name = data.name;
        this.dob = data.dob;
        this.gender = data.gender;
        this.phone = data.phone;
        this.is_shop = data.is_shop;
        this.status = data.status;
        this.defaut_address = data.defaut_address;
    }

}
