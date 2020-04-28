import DB from "../db/DB";
import HostMiddleware from "../http/middleware/HostMiddleware";

export default class HealthCheck {

    private static instance: HealthCheck;

    private errors: string[];

    private constructor() {}

    public static async check() {

        if (!HealthCheck.instance) HealthCheck.instance = new HealthCheck();

        HealthCheck.instance.reset();

        HealthCheck.instance
            .checkInstance(DB.getConnection(), 'db')
            .checkInstance(HostMiddleware.hosts, 'host-middleware');

        if (HealthCheck.instance.errors.length)
            throw new Error(`Health check for ${HealthCheck.instance.errors.join()} failed`);

        return 'OK'
    }

    private checkInstance(data: any, name: string) {
        try {
            if (!data) this.errors.push(name);
            return this
        } catch (e) {
            console.log(`HEALTH ERROR [${name}]`, e);
            this.errors.push(name);
            return this
        }
    }

    private reset(): void {
        this.errors = [];
    }
}