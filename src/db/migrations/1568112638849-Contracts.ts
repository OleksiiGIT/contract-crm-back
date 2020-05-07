import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class Contracts1568112638849 implements MigrationInterface {

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
                // Договор
                {
                    name: "name",
                    length: "256",
                    type: "varchar"
                },
                // Номер
                {
                    name: "number",
                    type: "int"
                },
                // Начало действия
                {
                    name: "start_at",
                    type: "timestamp"
                },
                // Конец действия
                {
                    name: "end_at",
                    type: "timestamp"
                },
                // Дата подписания
                {
                    name: "signed_at",
                    type: "timestamp"
                },
                // Тип
                {
                    name: "type",
                    length: "256",
                    type: "varchar"
                },
                // Статус
                {
                    name: "status",
                    type: "smallint",
                    default: 0
                },
                // Вернулся с подписью контрагента
                {
                    name: "signed_by_agent",
                    type: "bool",
                    default: false
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
