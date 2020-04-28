export default interface IService {

    getById(id: number): Promise<Object | null>

    get(params: Object): Promise<Object | Object[]>

    create(data: Object): Promise<Object>

    update(id: number, data: Object): Promise<Object>

    delete(id: number): Promise<Object>
}