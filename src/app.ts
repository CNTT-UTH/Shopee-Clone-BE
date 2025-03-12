import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import expressLayouts from 'express-ejs-layouts';
import { envConfig } from './constants/env';
import { initWebRoutes } from './routes/web.routes';
import AppDataSource from './dbs/db';
import { errorHandler } from './middlewares/errorHandler.middleware';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yaml';
import fs from 'fs';
import path from 'path';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import container from './container';
import { scopePerRequest } from 'awilix-express';
import winston from 'winston';
import { logger, logger_config, myCustomLevels } from './config/winston_config';

const file = fs.readFileSync(path.join(__dirname, '..', 'openapi/openapi.yaml'), 'utf8');
const swaggerDocs = YAML.parse(file);

const app = express();

// init middleware
app.use(morgan(envConfig.NODE_ENV === 'development' ? 'dev' : 'combined'));
app.use(helmet());
app.use(compression());
app.use(
    cors({
        origin: envConfig.FRONTEND_URL || 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        credentials: true,
    }),
);

// Setting logging with Winston


// Config View Engine
app.use(expressLayouts);
app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(scopePerRequest(container));

initWebRoutes(app);

app.use(errorHandler);

AppDataSource.initialize()
    .then(() => {
        logger.info('Data Source has been initialized!')
    })
    .catch((err) => {
        logger.error('Error during Data Source initialization', err);
    });

export default app;
