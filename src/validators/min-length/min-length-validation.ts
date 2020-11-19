import { InvalidFieldError } from "../errors"
import { FieldValidation } from "../protocols/field-validation"

export class MinLenghtValidation implements FieldValidation {
  constructor(readonly field: string) { }

  validate(value: string) {
    return value.length > 3 ? null : new InvalidFieldError()
  }
}

