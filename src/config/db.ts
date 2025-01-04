import "module-alias/register";
import { DataSource } from "typeorm";
import { envConfig } from "~/constants/env";
import { User } from "~/models/entity/user.entity";

const AppDataSource = new DataSource({
    type: "mysql",
    host: envConfig.DB_HOST,
    port: envConfig.DB_PORT,
    username: envConfig.DB_USER,
    password: envConfig.DB_PASSWORD,
    database: envConfig.DB_NAME,
    migrations: ["src/migrations/*.{ts, js}"],
    entities: [
        // "../models/entity/*.entity.{ts, js}"
        User,
    ],
    synchronize: false,
    // synchronize: envConfig.NODE_ENV === "development",
});
export default AppDataSource;
