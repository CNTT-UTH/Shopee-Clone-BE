import AppDataSource from "~/config/db";
import { RegisterReqBody } from "~/models/requests/users.requests";
import { User } from "~/models/entity/user.entity";
import bcrypt from "bcrypt";

class UserService {
    async register(payload: RegisterReqBody) {
        payload.password = await bcrypt.hash(payload.password, 10);

        const userRepository = AppDataSource.getRepository(User);
        const user = userRepository.create(payload);
        userRepository.save(user);

        return {
            status: "success",
        };
    }

    async login() {
        return {
            status: "success",
            message: "login",
        };
    }

    async greetings() {
        return {
            status: "success",
            message: "greetings",
        };
    }

    async checkEmail(email: string): Promise<boolean> {
        const userRepository = AppDataSource.getRepository(User);

        const user = await userRepository.findOneBy({ email });

        if (user) return true;
        else return false;
    }
}

export default new UserService();
