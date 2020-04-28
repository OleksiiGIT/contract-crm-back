import IRequest from "../../interfaces/IRequest";
import Joi from "../../utils/Joi";
import {Actions} from "../../enums/Actions";
import * as joi from "@hapi/joi";

export default abstract class BaseRequest implements IRequest {

    readonly query: Joi;
    readonly data: Joi;

    /**
     *
     * @param queryScheme - validation rules for query params
     * @param bodyScheme - validation rules for body params
     */
    protected constructor(queryScheme?: joi.ObjectSchema, bodyScheme?: joi.ObjectSchema) {
        if (queryScheme) this.query = new Joi(queryScheme);
        if (bodyScheme) this.data = new Joi(bodyScheme)
    }

    public validate(data: Object, action: Actions): string[] | null  {

        let errors = null;

        if (action === Actions.Get && this.query)
            errors = this.query.validate(data);
        else if (this.data)
            errors = this.data.validate(data, action === Actions.Create);

        if (!errors) return null;

        return errors.map(e=>e.message);
    }

}
