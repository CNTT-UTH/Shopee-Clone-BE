import app from './app';
import { alertToTelegram, logger } from './config/winston_config';
import { envConfig } from './constants/env';
import AppDataSource from './dbs/db';

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

app.listen(PORT, () => {
    logger.info(`Server is running on http://localhost:${PORT}`);
});
