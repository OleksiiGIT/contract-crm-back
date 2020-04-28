import * as express from "express"
import "reflect-metadata";
import * as bodyParser from "body-parser";
import * as dotenv from "dotenv";
import Routes from "./http/routes/Routes";
import DB from "./db/DB";
import HealthCheck from "./utils/HealthCheck";
import HostMiddleware from "./http/middleware/HostMiddleware";

export default class App {

    private static instance: express.Application;

    private constructor() {}

    public static async init(): Promise<express.Application> {

        if (App.instance) return App.instance;

        App.instance = express();

        if (!process.env.NODE_ENV) dotenv.config();

        await DB.init();

        // middleware
        App.instance.use(bodyParser.json());

        App.instance.use(HostMiddleware.load().apply);

        App.instance.use('/', (new Routes).get());

        await HealthCheck.check();

        return App.instance
    }

}