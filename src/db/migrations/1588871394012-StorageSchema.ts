import {MigrationInterface, QueryRunner} from "typeorm";

export class StorageSchema1588871394012 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE SCHEMA storage`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP SCHEMA storage`);
    }

}
