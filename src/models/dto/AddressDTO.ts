export class AddressDTO {
    city?: string;
    district?: string;
    ward?: string;
    address_line?: string;
    phone_number?: string;

    constructor({ city, district, ward, address_line, phone_number }: Partial<AddressDTO>) {
        this.city = city;
        this.district = district;
        this.ward = ward;
        this.address_line = address_line;
        this.phone_number = phone_number;
    }
}
