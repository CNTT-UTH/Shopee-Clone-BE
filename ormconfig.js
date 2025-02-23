import path from 'path';
import { envConfig } from '~/constants/env';

// eslint-disable-next-line no-undef
module.exports = {
    type: 'mysql',
    host: envConfig.DB_HOST,
    port: envConfig.DB_PORT,
    username: envConfig.DB_USER,
    password: envConfig.DB_PASSWORD,
    database: envConfig.DB_NAME,
    synchronize: false,
    logging: false,
    migrations: [
        // __dirname + '/../migrations/*.{ts, js}',
        path.join(path.dirname, 'src', 'migrations', '*.{ts, js}'),
    ],
    entities: [
        // __dirname + '/../models/entity/*.{ts, js}',
        path.join(path.dirname, 'src', 'models', 'entity', '*.{ts, js}'),
    ],
};
