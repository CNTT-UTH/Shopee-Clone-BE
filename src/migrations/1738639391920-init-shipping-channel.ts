import { MigrationInterface, QueryRunner } from "typeorm";
import fs from "fs";
import path from "path";

export class InitShippingChannel1738639391920 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const sql_scripts = fs
            .readFileSync(
                path.join(
                    __dirname,
                    "..",
                    "dbs",
                    "scripts",
                    "shippings",
                    "INIT_CHANNEL.SQL",
                ),
                "utf8",
            )
            .replace(/--.*$/gm, "")
            .replace("\r\n", "")
            .split(";");

        console.log(sql_scripts);

        sql_scripts.map(async (sql_query) => {
            if (!sql_query) return;
            if (!sql_query.includes("INSERT")) return;
            await queryRunner.query(sql_query);
        });
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const sql_scripts = fs.readFileSync(
            path.join(
                __dirname,
                "..",
                "dbs",
                "script",
                "shippings",
                "TRUNCATE_CHANNEL_TABLE.SQL",
            ),
            "utf8",
        );

        await queryRunner.query(sql_scripts);
    }

}
