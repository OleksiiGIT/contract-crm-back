import {validateSync} from "class-validator";
import IEntity from "../interfaces/IEntity";
import DB from "../db/DB";

export default abstract class BaseRepository {

    protected entity: IEntity;

    protected isUpdate: boolean = false;

    protected constructor(entity: IEntity) {
        this.entity = entity;
    }

    public async getMany(params: Object) {

        return this.getQueryBuilder('x')
            .getMany();
    }

    public async getById(id: number) {

        return DB.getConnection()
            .getRepository(this.entity.constructor.name)
            .findOne(id);
    }

    public async insert(data: Object) {

        this.build(data).validate();

        return DB.getManager().save(this.entity);
    }

    public async update(id: number, data: Object) {

        this.isUpdate = true;

        this.build(data).validate();

        const res = await DB.getConnection()
            .createQueryBuilder()
            .update(this.entity.constructor.name)
            // @ts-ignore
            .set(this.entity)
            .where("id = :id", {id: id})
            .returning("*")
            .execute();

        return res && res.raw && res.raw.length ? res.raw[0] : null;
    }

    public async delete(id: number) {

        return DB.getConnection()
            .createQueryBuilder()
            .delete()
            .from(this.entity.constructor.name)
            .where("id = :id", {id: id})
            .execute();
    }

    public async insertMany(entities: IEntity[]): Promise<IEntity[]> {

        entities.push(this.entity);

        const qr = DB.getConnection().createQueryRunner();
        await qr.connect();
        await qr.startTransaction();

        try {

            const inserted: IEntity[] = [];

            for (let entity of entities) {
                let res = await qr.manager.save(entity);
                inserted.push(res);
            }

            await qr.commitTransaction();

            return inserted;
        } catch (err) {
            await qr.rollbackTransaction();
            throw err;
        } finally {
            await qr.release();
        }
    }

    /**
     * this method is used to build entity class for both create and update actions
     *
     * @param data
     */
    protected abstract build(data: Object): this;

    public fill(data: Object) {
        return this.build(data).entity;
    }

    public getQueryBuilder(alias: string) {

        return DB.getConnection()
            .getRepository(this.entity.constructor.name)
            .createQueryBuilder(alias);
    }

    protected validate() {

        const errors = validateSync(this.entity, {skipMissingProperties: this.isUpdate});

        if (errors && errors.length) {
            let res: string = '';

            for (let error of errors) {
                res += `${error.property} is incorrect,`;
            }

            throw new Error(res);
        }

        return true;
    }
}