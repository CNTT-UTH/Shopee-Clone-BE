import { DataSource } from "typeorm";
import { envConfig } from "~/constants/env";

const AppDataSource = new DataSource({
    type: "mysql",
    host: envConfig.DB_HOST,
    port: envConfig.DB_PORT,
    username: envConfig.DB_USER,
    password: envConfig.DB_PASSWORD,
    database: envConfig.DB_NAME,
    entities: ["src/model/schemas/*.schemas.ts"],

});

export default AppDataSource;
