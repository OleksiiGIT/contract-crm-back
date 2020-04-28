import {Request, Response} from "express";
import HealthCheck from "../../utils/HealthCheck";

export default class MaintenanceController {

    public static health = (req: Request, res: Response) => {

        return HealthCheck.check()
            .then(d =>
                res.send('OK')
            ).catch(e => {
                res.status(500);
                res.send('NOT OK')
            });
    };

    public static test = (req: Request, res: Response) => {
        return res.send('test')
    };
}