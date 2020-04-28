import {Actions} from "../enums/Actions";

export default interface IRequest {

    validate(data: Object, action: Actions): string[] | null
}