import BaseMiddleware from "./BaseMiddleware";
import {NextFunction, Request, Response} from "express";

export default class HostMiddleware extends BaseMiddleware {

    private static allowedHosts: string[] = [];
    private static excludedEndpoints: string[] = [
        '/maintenance/health'
    ];

    private constructor() {
        super()
    }

    public static apply(req: Request, res: Response, next: NextFunction) {

        if (HostMiddleware.excludedEndpoints.includes(req.originalUrl)) return next();

        if (HostMiddleware.allowedHosts.includes(req.hostname)) return next();

        res.sendStatus(403);
    }

    public static get hosts() {
        return HostMiddleware.allowedHosts.length ? HostMiddleware.allowedHosts : null;
    }

    public static load() {
        HostMiddleware.allowedHosts = process.env.ALLOWED_HOSTS.split(',');
        return this
    }
}