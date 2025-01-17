import { Expose } from "class-transformer";

export class AddressDTO {
    @Expose()
    city?: string;

    @Expose()
    district?: string;

    @Expose()
    ward?: string;

    @Expose()
    address_line?: string;

    @Expose()
    phone_number?: string;

    // constructor({ city, district, ward, address_line, phone_number }: Partial<AddressDTO>) {
    //     this.city = city;
    //     this.district = district;
    //     this.ward = ward;
    //     this.address_line = address_line;
    //     this.phone_number = phone_number;
    // }
}
