import AppDataSource from "~/config/db";
import { RegisterReqBody } from "~/models/requests/users.requests";
import { User } from "~/models/entity/user.entity";

class UserService {
    async register(payload: RegisterReqBody) {
        await AppDataSource.getRepository(User).create(payload).save();

        return {
            status: "success",
            message: "register",
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
}

export default new UserService();
