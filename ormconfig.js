// eslint-disable-next-line @typescript-eslint/no-require-imports, no-undef
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-require-imports, no-undef
const { envConfig } = require('~/constants/env');

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
        path.join('src', 'migrations', '*.{ts, js}'),
    ],
    entities: [
        // __dirname + '/../models/entity/*.{ts, js}',
        path.join('src', 'models', 'entity', '*.{ts, js}'),
    ],
};
