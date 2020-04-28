import IRequest from "../../interfaces/IRequest";
import {Request, Response} from "express";
import IService from "../../interfaces/IService";
import {Actions} from "../../enums/Actions";

export default class BaseController {

    /**
     * request validator
     */
    protected rv: IRequest;
    protected service: IService;

    protected constructor(service: IService, requestValidator?: IRequest) {
        this.service = service;
        if (requestValidator) this.rv = requestValidator;
    }

    public getById = (req: Request, res: Response) => {

        const id = Number(req.params.id);

        if (!id) return this.handleError(req, res, new Error('empty id'), 404);

        return this.service.getById(Number(id))
            .then(data => this.handleResponse(req, res, data))
            .catch(error => this.handleError(req, res, error));
    };

    public get = (req: Request, res: Response) => {

        if (!this.validate(req, res, Actions.Get)) return false;

        return this.service.get({...req.query, ...req.params})
            .then(data => this.handleResponse(req, res, data))
            .catch(error => this.handleError(req, res, error));
    };

    public create = (req: Request, res: Response) => {

        if (!this.validate(req, res, Actions.Create)) return false;

        return this.service.create(req.body)
            .then(data => this.handleResponse(req, res, data))
            .catch(error => this.handleError(req, res, error));
    };

    public update = (req: Request, res: Response) => {

        if (!this.validate(req, res, Actions.Update)) return false;

        return this.service.update(Number(req.params.id), req.body)
            .then(data => this.handleResponse(req, res, data))
            .catch(error => this.handleError(req, res, error));
    };

    public delete = (req: Request, res: Response) => {

        return this.service.delete(Number(req.params.id))
            .then(data => this.handleResponse(req, res, data))
            .catch(error => this.handleError(req, res, error));
    };

    protected validate(req: Request, res: Response, action: Actions) {

        const data = action === Actions.Get ? {...req.query, ...req.params} : req.body;

        const errors = this.rv.validate(data, action);

        if (!errors) return true;

        res.status(500);

        res.send(errors.join(','));

        return false
    }

    protected handleResponse(req: Request, res: Response, data: any) {

        if (process.env.NODE_ENV === 'dev') console.log('RESPONSE: ', data);

        if (!data) return res.status(404).send(data);

        return res.send(data);
    }

    protected handleError(req: Request, res: Response, err: Error, status?: number) {

        if (process.env.NODE_ENV === 'dev') console.log('ERROR: ', err);

        return res.status(status|| 500).send(err.message);
    }
}