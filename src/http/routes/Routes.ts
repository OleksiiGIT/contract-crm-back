import {Router} from "express";
import MainRoutes from "./MainRoutes";
import MaintenanceRoutes from "./MaintenanceRoutes";
import BaseRoutes from "./BaseRoutes";

export default class Routes {

    constructor() {
        BaseRoutes.setRouter(Router());
    }

    //TODO: refactor routes structure
    public get() {
        (new MainRoutes('/api/v1')).init();
        (new MaintenanceRoutes('')).init();

        return BaseRoutes.getRouter();
    }
}