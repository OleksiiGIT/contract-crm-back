import BaseRequest from "./BaseRequest";
import * as joi from "@hapi/joi";

export default class ContractRequest extends BaseRequest {

    constructor() {
        super(
            joi.object({
                name: joi.string().min(1).max(256).optional(),
                endFrom: joi.date().iso().optional(),
                endTo: joi.date().iso().optional(),
            }),

            joi.object({
                name: joi.string().min(1).max(256),
            })
        )
    }
}