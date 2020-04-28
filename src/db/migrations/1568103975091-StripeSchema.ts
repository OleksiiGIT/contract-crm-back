import {MigrationInterface, QueryRunner} from "typeorm";

export class StripeSchema1568103975091 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE SCHEMA main`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP SCHEMA main`);
    }

}
