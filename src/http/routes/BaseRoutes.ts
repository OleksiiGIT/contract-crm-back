import {Router} from "express";

export default abstract class BaseRoutes {

    private static Router: Router;

    protected prefix: string;

    protected constructor(path: string) {
        this.prefix = path;
    }

    public static setRouter(router: Router) {
        if (!BaseRoutes.Router) BaseRoutes.Router = router;
    }

    public static getRouter() {
        return BaseRoutes.Router;
    }

    public abstract init(): void

    protected route(suffix: string) {
        return BaseRoutes.Router.route(this.prefix + suffix)
    }
}