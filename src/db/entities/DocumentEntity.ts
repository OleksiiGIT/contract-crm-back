import {
    Column,
    Entity, JoinColumn, OneToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import {
    IsDate, IsNumber,
    Length, Max, Min,
    ValidateIf
} from "class-validator";
import IEntity from "../../interfaces/IEntity";
import {DocumentTypes} from "../../enums/DocumentTypes";
import {DocumentStatuses} from "../../enums/DocumentStatuses";
import ContractEntity from "./ContractEntity";


@Entity("documents", {schema: "storage"})
export default class DocumentEntity implements IEntity {

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
    @OneToOne(() => ContractEntity, (item) => item.documents)
    @JoinColumn({ name: 'contract_id' })
    contract: number;


    @Length(3, 2048)
    @Column("varchar", {
        nullable: false,
        name: "uri"
    })
    uri: string;


    @Length(3, 256)
    @Column("varchar", {
        nullable: false,
        name: "filename"
    })
    filename: string;


    @ValidateIf(o => o.date)
    @IsDate()
    @Column("timestamp", {
        nullable: true,
        name: "date"
    })
    date: Date | null;


    @ValidateIf(o => o.status)
    @IsNumber()
    @Min(DocumentStatuses.Active)
    @Max(DocumentStatuses.Archived)
    @Column("smallint", {
        nullable: false,
        name: "status",
        default: DocumentStatuses.Active
    })
    status: DocumentStatuses;


    @ValidateIf(o => o.type)
    @IsNumber()
    @Min(DocumentTypes.Normal)
    @Max(DocumentTypes.Act)
    @Column("smallint", {
        nullable: false,
        name: "type",
        default: DocumentTypes.Act
    })
    type: DocumentTypes;


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
