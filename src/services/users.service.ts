import { UserGender } from "~/constants/enums";
import HTTP_STATUS from "~/constants/httpStatus";
import { USERS_MESSAGES } from "~/constants/messages";
import { AddressDTO } from "~/models/dto/AddressDTO";
import { UserDTO } from "~/models/dto/UserDTO";
import { UserRepository } from "~/repository/user.repository";
import { ApiError } from "~/utils/errors";

class UserService {
    private readonly userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }
    async getProfile(_id: string) {
        const user = await this.userRepository.findById(_id);

        if (!user) {
            throw new ApiError(USERS_MESSAGES.USERNAME_DOES_NOT_EXIST, HTTP_STATUS.BAD_REQUEST);
        }

        const userAddress = new AddressDTO({});

        const userDTO: UserDTO = new UserDTO({
            user_id: user._id,
            username: user.username,
            email: user.email,
            name: user.name,
            dob: user.dob?.getTime().toString(),
            gender: user.gender,
            phone: user.phone,
            is_shop: user.isShop,
            status: user.verify,
            defaut_address: userAddress,
        });

        console.log(userDTO);
        return {
            user_profile: userDTO,
        };
    }
}

export default new UserService();
