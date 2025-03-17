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
import { alertToTelegram, logger, logger_config, myCustomLevels } from './config/winston_config';
import { rateLimit } from 'express-rate-limit';
import { useContainer } from 'class-validator';

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

// Setting api rate limit with express-rate-limit
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    limit: 1000,
    standardHeaders: true,
    legacyHeaders: false,
});
app.use(limiter);

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

export default app;
