import { UserGender } from "~/constants/enums";
import HTTP_STATUS from "~/constants/httpStatus";
import { USERS_MESSAGES } from "~/constants/messages";
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

        return {
            user_profile: {
                _id: user._id,
                username: user.username,
                email: user.email,
                nickname: user.name,
                dob: user.dob,
                gender: user.gender as UserGender,
                avatar: user.avatar,
                phone: user.phone
            },
        };
    }
}

export default new UserService();
