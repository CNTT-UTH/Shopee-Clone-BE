import { CONNECT } from 'awilix-express';
import { createClient } from 'redis';
import { logger } from '~/config/winston_config';
import { envConfig } from '~/constants/env';

export const redis = createClient({
    username: 'default',
    password: envConfig.REDIS_PASSWORD,
    socket: {
        host: envConfig.REDIS_HOST,
        port: envConfig.REDIS_PORT,
        connectTimeout: 20000,
    },
});
