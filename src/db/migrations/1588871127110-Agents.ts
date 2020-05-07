import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class Agents1588871127110 implements MigrationInterface {

    private name = "main.agents";

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
                // Контрагент
                {
                    name: "name",
                    length: "256",
                    type: "varchar"
                },
                // Тип 0 - чужой, 1 - свой, 2 - архивированый
                {
                    name: "type",
                    type: "smallint",
                    default: 0
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
