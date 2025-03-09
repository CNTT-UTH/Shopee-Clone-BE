import { MigrationInterface, QueryRunner } from 'typeorm';
import fs from 'fs';
import path from 'path';

export class InputDataProvincesDatabase1737519051246 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const sql_scripts = fs
            .readFileSync(
                path.join(
                    __dirname,
                    '..',
                    'dbs',
                    'scripts',
                    'vietnamese-provinces-database',
                    'IMPORT_DATA_VN_UNITS.SQL',
                ),
                'utf8',
            )
            .replace('\r\n', '')
            .replace(/--.*$/gm, '')
            .split(';');

        sql_scripts.map(async (sql_query) => {
            if (!sql_query) return;
            if (!sql_query.includes('INSERT')) return;
            await queryRunner.query(sql_query);
        });
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const sql_scripts = fs.readFileSync(
            path.join(__dirname, '..', 'dbs', 'script', 'vietnamese-provinces-database', 'TRUNCATE_TABLES.SQL'),
            'utf8',
        );

        await queryRunner.query(sql_scripts);
    }
}
