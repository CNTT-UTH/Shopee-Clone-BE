import { plainToInstance } from 'class-transformer';
import HTTP_STATUS from '~/constants/httpStatus';
import { USERS_MESSAGES } from '~/constants/messages';
import { AddressDTO } from '~/models/dtos/AddressDTO';
import { Address } from '~/models/entity/address.entity';
import { User } from '~/models/entity/user.entity';
import { AddressRepository } from '~/repository/address.repository';
import { CityRepository } from '~/repository/city.repository';
import { UserRepository } from '~/repository/user.repository';
import { ApiError } from '~/utils/errors';

export class AddressService {
    private readonly addressRepository: AddressRepository;
    private readonly userRepository: UserRepository;
    private readonly cityRepository: CityRepository;

    constructor() {
        this.addressRepository = new AddressRepository();
        this.userRepository = new UserRepository();
        this.cityRepository = new CityRepository();
    }

    async getAddress(id: number) {
        const address = await this.addressRepository.findAddressById(id);
        const addressDTO: AddressDTO = plainToInstance(AddressDTO, address);

        return addressDTO;
    }

    async getUserAddresses(id: string) {
        const addresses: Address[] = await this.addressRepository.findAddressUserId(id);
        const addressDTO: AddressDTO[] = await Promise.all(
            addresses.map((address) => {
                return plainToInstance(AddressDTO, address);
            }),
        ).then((res) => res);

        return addressDTO;
    }

    async createUserAdress(user_id: string, addressDTO: AddressDTO) {
        const user: User | null = await this.userRepository.findById(user_id);
        if (!user) {
            throw new ApiError(USERS_MESSAGES.USER_NOT_FOUND, HTTP_STATUS.BAD_REQUEST);
        }

        const address: Address = await this.addressRepository.createAddressForUser(addressDTO, user);
        const newAddressDTO: AddressDTO = plainToInstance(AddressDTO, address);

        return newAddressDTO;
    }

    async getAllCities() {
        const data = await this.cityRepository.getAllCity();
        return data;
    }
    async getAllDistricts(code: string) {
        const data = await this.cityRepository.getAllDistrict(code);
        return data;
    }
    async getAllWards(code: string) {
        const data = await this.cityRepository.getAllWard(code);
        return data;
    }
}
