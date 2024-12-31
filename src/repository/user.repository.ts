import { Repository } from "typeorm";
import { User } from "~/models/entity/user.entity";

export class UserRepository extends Repository<User> {
    async createAndSave(userData: Partial<User>): Promise<User> {
        const user = this.create(userData);
        return this.save(user);
    }

    async findByEmailOrUsername(email?: string, username?: string): Promise<User | null> {
        return this.findOne({
            where: [{ email }, { username }],
        });
    }

    async existsByEmail(email: string): Promise<boolean> {
        const user = await this.findOneBy({ email });
        return !!user;
    }

    async existsByUsername(username: string): Promise<boolean> {
        const user = await this.findOneBy({ username });
        return !!user;
    }

    async updateRefreshToken(userID: string, refreshToken: string): Promise<void> {
        await this.update({ _id: userID }, { refresh_token: refreshToken });
    }

    async updateRefreshTokenMobile(userID: string, refreshToken: string): Promise<void> {
        await this.update({ _id: userID }, { refresh_token_mobile: refreshToken });
    }
}
