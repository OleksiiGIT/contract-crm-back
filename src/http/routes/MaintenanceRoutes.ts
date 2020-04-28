import BaseRoutes from "./BaseRoutes";
import MaintenanceController from "../controllers/MaintenanceController";

export default class MaintenanceRoutes extends BaseRoutes {

    constructor(path: string) {
        super(path);
    }

    public init() {
        this.route('/maintenance/health').get(MaintenanceController.health);

        this.route('/test').get(MaintenanceController.test);
    }
}