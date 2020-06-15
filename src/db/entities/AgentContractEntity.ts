import {
    Entity, JoinColumn, ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import IEntity from "../../interfaces/IEntity";
import AgentEntity from "./AgentEntity";
import ContractEntity from "./ContractEntity";


@Entity("agent_contract", {schema: "main"})
export default class AgentContractEntity implements IEntity {

    @PrimaryGeneratedColumn({
        type: "integer",
        name: "id"
    })
    id: number;


    @ManyToOne(() => AgentEntity, (item) => item.agentContracts)
    @JoinColumn({ name: 'agent_id' })
    agents: number;

    @ManyToOne(() => ContractEntity, (item) => item.agentContracts)
    @JoinColumn({ name: 'contract_id' })
    contracts: number;
}
