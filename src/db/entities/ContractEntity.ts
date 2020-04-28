import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from "typeorm";
import {
    IsDate,
    Length,
    ValidateIf
} from "class-validator";
import IEntity from "../../interfaces/IEntity";


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
}
