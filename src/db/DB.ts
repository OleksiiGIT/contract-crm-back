import {Connection, createConnection, EntityManager, getManager} from "typeorm";

export default class DB {

    private static connection: Connection;

    private constructor() {
    }

    public static async init() {

        if (!DB.connection)
            DB.connection = await createConnection();

        return DB.connection;
    }

    public static getConnection(): Connection {

        if (!DB.connection)
            throw new Error('no db connection');

        return DB.connection;
    }

    public static getManager(): EntityManager {

        if (!DB.connection)
            throw new Error('no db connection');

        return getManager();
    }
}