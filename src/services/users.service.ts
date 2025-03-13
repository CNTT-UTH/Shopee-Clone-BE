import { plainToInstance } from 'class-transformer';
import { UserGender } from '~/constants/enums';
import HTTP_STATUS from '~/constants/httpStatus';
import { USERS_MESSAGES } from '~/constants/messages';
import { AddressDTO } from '~/models/dtos/AddressDTO';
import { UserDTO } from '~/models/dtos/UserDTO';
import { User } from '~/models/entity/user.entity';
import { UpdateProfileReqBody } from '~/models/requests/users.requests';
import { AddressRepository } from '~/repository/address.repository';
import { UserRepository } from '~/repository/user.repository';
import { ApiError } from '~/utils/errors';
import { AddressService } from './address.service';

export class UserService {
    private readonly userRepository: UserRepository;
    private readonly addressRepository: AddressRepository;

    constructor(private readonly addressService: AddressService) {
        this.userRepository = new UserRepository();
    }

    async getOne(_id: string) {
        return await this.userRepository.findById(_id);
    }

    async getProfile(_id: string) {
        const user = await this.userRepository.findById(_id);

        if (!user) {
            throw new ApiError(USERS_MESSAGES.USERNAME_DOES_NOT_EXIST, HTTP_STATUS.BAD_REQUEST);
        }

        const user_address = user?.default_address_id
            ? this.addressRepository.findAddressById(user?.default_address_id)
            : {};

        const userAddress: AddressDTO = plainToInstance(AddressDTO, user_address);

        const userDTO: UserDTO = plainToInstance(UserDTO, {
            ...user,
            default_address: userAddress,
        });

        return {
            user_profile: userDTO,
        };
    }

    async getAll() {
        const users = await this.userRepository.findAll();

        const userDTOs: UserDTO[] = [];

        for (const user of users) {
            userDTOs.push(plainToInstance(UserDTO, user));
        }

        return {
            user_profiles: userDTOs,
        };
    }

    async updateProfile(payload: Partial<UpdateProfileReqBody>, userID: string) {
        const user: User | null = await this.userRepository.findById(userID as string);

        if (!user) {
            throw new ApiError(USERS_MESSAGES.USERNAME_DOES_NOT_EXIST, HTTP_STATUS.BAD_REQUEST);
        }

        let userDTO: UserDTO = plainToInstance(UserDTO, user);

        userDTO = {
            ...userDTO,
            ...payload,
        };

        await this.userRepository.updateProfile(userDTO);

        return {
            user_profile: userDTO,
        };
    }

    async setAddressDefault(user_id: string, address_id: number) {
        if (await this.addressService.checkExists(address_id)) {
            throw new ApiError('Dia chi khong ton tai!', HTTP_STATUS.BAD_REQUEST);
        }

        this.userRepository.update({ _id: user_id }, { default_address_id: address_id });

        return {
            user_id,
            address_id,
        };
    }
}
