import BaseController from "./BaseController";
import ContractService from "../../services/ContractService";
import ContractRequest from "../requests/ContractRequest";

export default class ContractController extends BaseController {

    constructor() {
        super(new ContractService(), new ContractRequest());
    }
}