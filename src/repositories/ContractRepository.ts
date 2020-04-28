import BaseRepository from "./BaseRepository";
import {ContractType} from "../types/ContractType";
import ContractEntity from "../db/entities/ContractEntity";

export default class ContractRepository extends BaseRepository {

    constructor() {
        super(new ContractEntity());
    }

    build(data: ContractType) {

        if (!this.isUpdate || data.name) this.entity.name = data.name;

        if (!this.isUpdate) this.entity.created = new Date((new Date()).toUTCString());
        if (this.isUpdate) this.entity.updated = new Date((new Date()).toUTCString());

        return this;
    }
}