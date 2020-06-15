import {
    Column,
    Entity, OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import {
    IsDate, IsNumber,
    Length, Max, Min,
    ValidateIf
} from "class-validator";
import IEntity from "../../interfaces/IEntity";
import {AgentTypes} from "../../enums/AgentTypes";
import AgentContractEntity from "./AgentContractEntity";


@Entity("agents", {schema: "main"})
export default class AgentEntity implements IEntity {

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


    @ValidateIf(o => o.type)
    @IsNumber()
    @Min(AgentTypes.Internal)
    @Max(AgentTypes.External)
    @Column("smallint", {
        nullable: false,
        name: "type",
        default: AgentTypes.Internal
    })
    type: AgentTypes;


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


    @OneToMany(() => AgentContractEntity, (item) => item.agents)
    agentContracts: AgentContractEntity[];
}
