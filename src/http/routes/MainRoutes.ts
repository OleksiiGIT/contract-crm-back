import BaseRoutes from "./BaseRoutes";
import ContractController from "../controllers/ContractController";

export default class MainRoutes extends BaseRoutes {

    private contract: ContractController;

    constructor(path: string) {
        super(path);
        this.contract = new ContractController();
    }

    public init() {

        this.route('/contracts').get(this.contract.get);
        this.route('/contracts/:id').get(this.contract.getById);
        this.route('/contracts').post(this.contract.create);
        this.route('/contracts/:id').patch(this.contract.update);
        this.route('/contracts/:id').delete(this.contract.delete);
    }
}