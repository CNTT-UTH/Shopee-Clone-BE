import 'module-alias/register';
import path from 'path';
import fs from 'fs';
import { DataSource } from 'typeorm';
import { envConfig } from '~/constants/env';
import { User } from '~/models/entity/user.entity';

import ormConfig from '../config/ormconfig.js';
import { logger } from '~/config/winston_config';

['migrations', 'entities', 'seeds', 'factories'].forEach((domain) => {
    (ormConfig as any)?.[domain].forEach((dir: string, index: number, arr: string[]) => {
        if (envConfig?.NODE_ENV === 'production') {
            arr[index] = dir.replace('{ts, js}', 'js');
        }
    });
});

logger.info(ormConfig.entities);

const AppDataSource = new DataSource(ormConfig as any);
export default AppDataSource;
