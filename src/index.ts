import app from './app';
import { logger } from './config/winston_config';
import { envConfig } from './constants/env';

const PORT = envConfig.PORT || 3004;

// Start the server
app.listen(PORT, () => {
    logger.info(`Server is running on http://localhost:${PORT}`);
});
