import { InvalidFieldError } from "../errors";
import { FieldValidation } from "../protocols/field-validation";

export class EmailValidation implements FieldValidation {
    constructor(readonly field: string) { }
    validate(value: string): Error {
      return new InvalidFieldError()
    }
  }