import app from './app';
import { alertToTelegram, logger } from './config/winston_config';
import { envConfig } from './constants/env';
import AppDataSource from './dbs/db';
import { redis } from './utils/redis';

const PORT = envConfig.PORT || 3004;

AppDataSource.initialize()
    .then(() => {
        logger.info('Data Source has been initialized!');
        alertToTelegram('info', 'Data Source has been initialized!');
    })
    .catch((err) => {
        logger.log('error', 'Error during Data Source initialization', err);
        alertToTelegram('error', 'Error during Data Source initialization');
    });

(async () => {
    redis.on('error', (err: any) => {
        logger.error(err);
    });

    redis.on('reconnect', () => {
        logger.info(`Redis reconnecting`);
    });

    redis.on('connect', () => {
        logger.info(`Redis connect successful!`);
    });

    await redis.connect();

})().catch((e) => {
    logger.error(e);
});

app.listen(PORT, () => {
    logger.info(`Server is running on http://localhost:${PORT}`);
});
