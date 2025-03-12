/* eslint-disable no-undef */
// eslint-disable-next-line @typescript-eslint/no-require-imports
require('module-alias/register'); // Ensure this is at the top

// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { envConfig } = require('~/constants/env');

module.exports = {
    type: 'mariadb',
    host: envConfig.DB_HOST,
    port: envConfig.DB_PORT,
    username: envConfig.DB_USER,
    password: envConfig.DB_PASSWORD,
    database: envConfig.DB_NAME,
    synchronize: false,
    logging: false,
    migrations: [
        // '..' + '/../migrations/*.{ts, js}',
        path.join(__dirname, '..', 'migrations', '*.{ts, js}'),
    ],
    entities: [
        // '..' + '/../models/entity/*.{ts, js}',
        path.join(__dirname, '..', 'models', 'entity', '*.entity.{ts, js}'),
    ],
    seeds: [
        path.join(__dirname, '..', 'seeders', '*.seed.{ts, js}'),
        // path.join('..', 'seeders', 'updateimage.seed.{ts, js}'),
    ],
    factories: [path.join(__dirname, '..', 'seeders', '*.factory.{ts, js}')],
};
