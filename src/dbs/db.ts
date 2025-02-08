import 'module-alias/register';
import { DataSource } from 'typeorm';
import { envConfig } from '~/constants/env';
import { User } from '~/models/entity/user.entity';

const AppDataSource = new DataSource({
    type: 'mysql',
    host: envConfig.DB_HOST,
    port: envConfig.DB_PORT,
    username: envConfig.DB_USER,
    password: envConfig.DB_PASSWORD,
    database: envConfig.DB_NAME,
    synchronize: false,
    logging: false,
    migrations: [__dirname + '/../migrations/*.{ts, js}'],
    entities: [__dirname + '/../models/entity/*.{ts, js}'],
});
export default AppDataSource;
