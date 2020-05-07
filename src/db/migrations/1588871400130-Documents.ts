import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class Documents1588871400130 implements MigrationInterface {

    private name = "storage.documents";

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
                // Имя
                {
                    name: "name",
                    length: "256",
                    type: "varchar"
                },
                // Контракт
                {
                    name: 'contract_id',
                    type: 'int',
                },
                // Путь
                {
                    name: "uri",
                    length: "2048",
                    type: "varchar"
                },
                // Имя файла
                {
                    name: "filename",
                    length: "256",
                    type: "varchar"
                },
                // Тип 0 - активный, 1 - архивированый
                {
                    name: "status",
                    type: "smallint",
                    default: 0
                },
                // Тип 0 - обычный, 1 - акт выполненых работ
                {
                    name: "type",
                    type: "smallint",
                    default: 0
                },
                // Месяц для акта выполненых работ
                {
                    name: "date",
                    type: "timestamp",
                    isNullable: true
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
            ],
            foreignKeys: [
                {
                    columnNames: ["contract_id"],
                    referencedColumnNames: ["id"],
                    referencedTableName: "main.contracts",
                    onDelete: "CASCADE"
                }
            ]
        }), true)

    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable(this.name);
    }

}
