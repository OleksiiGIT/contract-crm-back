import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class AgentContract1588872093908 implements MigrationInterface {

    private name = 'main.agent_contract';

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: this.name,
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                },
                {
                    name: 'agent_id',
                    type: 'int',
                },
                {
                    name: 'contract_id',
                    type: 'int',
                },
            ],
            foreignKeys: [
                {
                    columnNames: ['agent_id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'main.agents',
                    onDelete: 'CASCADE',
                },
                {
                    columnNames: ["contract_id"],
                    referencedColumnNames: ["id"],
                    referencedTableName: "main.contracts",
                    onDelete: "CASCADE"
                }
            ],
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable(this.name);
    }

}
