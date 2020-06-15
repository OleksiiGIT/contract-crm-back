import BaseRepository from "./BaseRepository";
import {ContractType} from "../types/ContractType";
import ContractEntity from "../db/entities/ContractEntity";
import {ContractGetParams} from "../types/get-params/ContractGetParams";
import DB from "../db/DB";

export default class ContractRepository extends BaseRepository {

    constructor() {
        super(new ContractEntity());
    }

    public async getMany(params: ContractGetParams) {

        const connection = DB.getConnection()
            .getRepository(ContractEntity)
            .createQueryBuilder('c')
            .leftJoinAndSelect('c.agentContracts', 'ac')
            .leftJoinAndSelect('ac.agents', 'a')
            .leftJoinAndSelect('c.documents', 'd');

        if (params.endFrom) connection.where('c.end > :endFrom');

        if (params.endTo) connection.where('c.end < :endTo');


        return connection.setParameters(params).getMany();
    }

    build(data: ContractType) {

        if (!this.isUpdate || data.name) this.entity.name = data.name;

        if (!this.isUpdate) this.entity.created = new Date((new Date()).toUTCString());
        if (this.isUpdate) this.entity.updated = new Date((new Date()).toUTCString());

        return this;
    }
}