import {
    Column,
    Entity, OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import {
    IsBoolean,
    IsDate, IsNumber,
    Length, Max, Min,
    ValidateIf
} from "class-validator";
import IEntity from "../../interfaces/IEntity";
import {ContractStatuses} from "../../enums/ContractStatuses";
import AgentContractEntity from "./AgentContractEntity";
import DocumentEntity from "./DocumentEntity";


@Entity("contracts", {schema: "main"})
export default class ContractEntity implements IEntity {

    @PrimaryGeneratedColumn({
        type: "integer",
        name: "id"
    })
    id: number;


    @Length(3, 256)
    @Column("varchar", {
        nullable: false,
        name: "name"
    })
    name: string;


    @IsNumber()
    @Min(1)
    @Column("int", {
        nullable: false,
        name: "number"
    })
    number: number;


    @IsDate()
    @Column("timestamp", {
        nullable: false,
        name: "start_at"
    })
    start: Date;


    @IsDate()
    @Column("timestamp", {
        nullable: false,
        name: "end_at"
    })
    end: Date;


    @IsDate()
    @Column("timestamp", {
        nullable: false,
        name: "signed_at"
    })
    signedAt: Date;


    @Length(3, 256)
    @Column("varchar", {
        nullable: false,
        name: "type"
    })
    type: string;


    @ValidateIf(o => o.status)
    @IsNumber()
    @Min(ContractStatuses.Created)
    @Max(ContractStatuses.Finished)
    @Column("smallint", {
        nullable: false,
        name: "status",
        default: ContractStatuses.Created
    })
    status: ContractStatuses;


    @ValidateIf(o => o.signed)
    @IsBoolean()
    @Column("bool", {
        nullable: false,
        name: "signed_by_agent",
        default: false
    })
    signed: boolean;


    @IsDate()
    @Column("timestamp", {
        nullable: false,
        default: Date.now(),
        name: "created_at"
    })
    created: Date;


    @ValidateIf(o => o.updated)
    @IsDate()
    @Column("timestamp", {
        nullable: true,
        name: "updated_at"
    })
    updated: Date | null;


    @OneToMany(() => AgentContractEntity, (item) => item.contracts)
    agentContracts: AgentContractEntity[];

    @OneToMany(() => DocumentEntity, (item) => item.contract)
    documents: DocumentEntity[];
}
