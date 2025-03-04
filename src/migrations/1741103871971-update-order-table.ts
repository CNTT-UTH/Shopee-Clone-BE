import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateOrderTable1741103871971 implements MigrationInterface {
    name = 'UpdateOrderTable1741103871971'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` CHANGE \`shipping_channel_id\` \`id\` varchar(36) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` CHANGE \`id\` \`shipping_channel_id\` varchar(36) NOT NULL`);
    }

}
