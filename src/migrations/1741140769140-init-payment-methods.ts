import { MigrationInterface, QueryRunner } from "typeorm";

export class InitPaymentMethods1741140769140 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`INSERT INTO payment_methods(\`name\`) VALUES  ('Thanh toán khi nhận hàng (COD)')`)
    }
    
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE payment_methods WHERE \`name\` = \`Thanh toán khi nhận hàng (COD)\``)
    }

}
