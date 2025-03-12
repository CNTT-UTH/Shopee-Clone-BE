import { MigrationInterface, QueryRunner } from 'typeorm';
import fs from 'fs';
import path from 'path';

export class InitProvincesDatabase1737519000408 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const sql_scripts = fs
            .readFileSync(
                path.join(
                    __dirname,
                    '..',
                    'dbs',
                    'scripts',
                    'vietnamese-provinces-database',
                    'CREATE_TABLES_VN_UNITS.SQL',
                ),
                'utf8',
            )
            .replace('\r\n', '')
            .replace(/--.*$/gm, '')
            .split(';');


        sql_scripts.map(async (sql_query) => {
            if (!sql_query) return;
            await queryRunner.query(sql_query);
        });
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const sql_scripts = fs.readFileSync(
            path.join(__dirname, '..', 'dbs', 'script', 'vietnamese-provinces-database', 'DROP_TABLES.SQL'),
            'utf8',
        );

        await queryRunner.query(sql_scripts);
    }
}
