import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateColumnFreeship1739785836401 implements MigrationInterface {
    name = 'UpdateColumnFreeship1739785836401';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE \`shipping_product_infos\` CHANGE \`freeship\` \`freeship\` tinyint NOT NULL DEFAULT 0`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE \`shipping_product_infos\` CHANGE \`freeship\` \`freeship\` tinyint NOT NULL`,
        );
    }
}
