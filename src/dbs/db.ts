import 'module-alias/register';
import path from 'path';
import fs from 'fs';
import { DataSource } from 'typeorm';
import { envConfig } from '~/constants/env';
import { User } from '~/models/entity/user.entity';

import ormConfig from '../../ormconfig.js';

// const CONFIG_FILE_PATH = path.join('..', '..', 'ormconfig.js');

const AppDataSource = new DataSource(ormConfig as any);
export default AppDataSource;
