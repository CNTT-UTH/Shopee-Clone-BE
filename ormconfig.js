/* eslint-disable no-undef */
// eslint-disable-next-line @typescript-eslint/no-require-imports
require('module-alias/register'); // Ensure this is at the top

// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { envConfig } = require('~/constants/env');

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
        path.join(__dirname, 'src', 'migrations', '*.{ts, js}'),
    ],
    entities: [
        // __dirname + '/../models/entity/*.{ts, js}',
        path.join(__dirname, 'src', 'models', 'entity', '*.entity.{ts, js}'),
    ],
    seeds: [
        path.join('src', 'seeders', '*.seed.{ts, js}'),
        // path.join(__dirname, 'src', 'seeders', 'updateimage.seed.{ts, js}'),
    ],
    factories: [path.join(__dirname, 'src', 'seeders', '*.factory.{ts, js}')],
};
