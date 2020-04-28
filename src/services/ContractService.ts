import BaseService from "./BaseService";
import {ContractGetParams} from "../types/get-params/ContractGetParams";
import ContractRepository from "../repositories/ContractRepository";
import {ContractType} from "../types/ContractType";

export default class ContractService extends BaseService {

    private repository = new ContractRepository();

    public async getById(id: number) {
        return this.repository.getById(id);
    }

    public async get(params: ContractGetParams) {
        return this.repository.getMany(params);
    }

    public async create(data: ContractType) {
        return (new ContractRepository()).insert(data);
    }

    public async update(id: number, data: ContractRepository) {
        return (new ContractRepository()).update(id, data);
    }

    public async delete(id: number) {
        return this.repository.delete(id);
    }

}