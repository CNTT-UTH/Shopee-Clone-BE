import { AddressDTO } from "./AddressDTO";

export class UserDTO {
    user_id?: string;
    username?: string;
    email?: string;
    name?: string;
    dob?: string;
    gender?: number; // 0: Nam, 1: Nữ, 2: Khác
    phone?: string;
    is_shop?: boolean;
    status?: number; // 0: Chưa xác nhận mail, 1: Đã xác thực, 2: Banned
    defaut_address?: AddressDTO;

    constructor({
        user_id,
        username,
        email,
        name,
        dob,
        gender,
        phone,
        is_shop,
        status,
        defaut_address,
    }: Partial<UserDTO>) {
        this.user_id = user_id;
        this.username = username;
        this.email = email;
        this.name = name;
        this.dob = dob;
        this.gender = gender;
        this.phone = phone;
        this.is_shop = is_shop;
        this.status = status;
        this.defaut_address = defaut_address;
    }
}
