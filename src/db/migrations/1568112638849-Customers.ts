import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class Customers1568112638849 implements MigrationInterface {

    private name = "main.contracts";

    public async up(queryRunner: QueryRunner): Promise<any> {

        await queryRunner.createTable(new Table({
            name: this.name,
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true
                },
                {
                    name: "name",
                    length: "256",
                    type: "varchar"
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: 'now()'
                },
                {
                    name: "updated_at",
                    type: "timestamp",
                    isNullable: true
                }
            ]
        }), true)

    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable(this.name);
    }

}
