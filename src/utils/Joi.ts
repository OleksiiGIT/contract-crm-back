import * as joi from "@hapi/joi";

export default class Joi {

    readonly schema: joi.ObjectSchema;

    constructor(schema: joi.ObjectSchema) {
        this.schema = schema;
    }

    public validate(data: Object, presenceRequired: boolean = true) {

        const res = this.schema.validate(data,  {
            abortEarly: false,
            presence: presenceRequired ? "required" : "optional"
        });

        if (!res.error) return null;

        return res.error.details;
    }
}