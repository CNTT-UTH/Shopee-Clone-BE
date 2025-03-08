import 'module-alias/register';
import path from 'path';
import fs from 'fs';
import { DataSource } from 'typeorm';
import { envConfig } from '~/constants/env';
import { User } from '~/models/entity/user.entity';

import ormConfig from '../../ormconfig.js';

['migrations', 'entities', 'seeds', 'factories'].forEach((domain) => {
    (ormConfig as any)?.[domain].forEach((dir: string, index: number, arr: string[]) => {
        if (envConfig?.NODE_ENV === 'production') {
          arr[index] = dir.replace('{ts, js}', 'js');
        }
    });
});

const AppDataSource = new DataSource(ormConfig as any);
export default AppDataSource;
