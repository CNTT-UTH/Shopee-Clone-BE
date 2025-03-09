import { MigrationInterface, QueryRunner } from 'typeorm';
import fs from 'fs';
import path from 'path';

export class InitDataAttributesTable1739323304210 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const sql_scripts = fs
            .readFileSync(path.join(__dirname, '..', 'dbs', 'scripts', 'attribute', 'INIT_ATTRIBUTE.SQL'), 'utf8')
            // .replace("\r\n", "")
            // .replace("\n", "")
            .split('\n');

        console.log(sql_scripts);

        sql_scripts.map(async (sql_query) => {
            if (!sql_query) return;
            if (!sql_query.includes('INSERT')) return;
            await queryRunner.query(sql_query);
        });
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const sql_scripts = 'DELETE FROM attributes';

        await queryRunner.query(sql_scripts);
    }
}
