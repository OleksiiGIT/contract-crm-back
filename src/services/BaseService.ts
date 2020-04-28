import IService from "../interfaces/IService";
import Logger from "../utils/Logger";

export default abstract class BaseService implements IService {

    public abstract async getById(id: number): Promise<Object | null>

    public abstract async get(params: Object): Promise<Object[]>

    public abstract async create(data: Object): Promise<Object>

    public abstract async update(id: number, data: Object): Promise<Object>

    public abstract async delete(id: number): Promise<Object>

    protected handleError(err: any) {
        Logger.getInstance().log('ERROR: ', err)
    }
}