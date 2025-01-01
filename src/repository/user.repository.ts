import { Repository } from "typeorm";
import AppDataSource from "~/config/db";
import { User } from "~/models/entity/user.entity";

export class UserRepository {
    private repo: Repository<User>;

    constructor() {
        this.repo = AppDataSource.getRepository(User);
    }

    async createAndSave(userData: Partial<User>): Promise<User> {
        const user = this.repo.create(userData);
        return this.repo.save(user);
    }

    async findByEmailOrUsername(email?: string, username?: string): Promise<User | null> {
        return this.repo.findOne({
            where: [{ email }, { username }],
        });
    }

    async existsByEmail(email: string): Promise<boolean> {
        const user = await this.repo.findOneBy({ email });
        return !!user;
    }

    async existsByUsername(username: string): Promise<boolean> {
        const user = await this.repo.findOneBy({ username });
        return !!user;
    }

    async updateRefreshToken(userID: string, refreshToken: string): Promise<void> {
        await this.repo.update({ _id: userID }, { refresh_token: refreshToken });
    }

    async updateRefreshTokenMobile(userID: string, refreshToken: string): Promise<void> {
        await this.repo.update({ _id: userID }, { refresh_token_mobile: refreshToken });
    }

    async findById(_id: string): Promise<User | null> {
        return this.repo.findOneBy({ _id });
    }
}
