import { RequiredFieldError } from "../errors";
import { FieldValidation } from "../protocols/field-validation";

export default class RequiredFieldValidation implements FieldValidation {
    constructor(readonly field: string) { }

    validate(value: string): Error {
        return new RequiredFieldError();
    }
}