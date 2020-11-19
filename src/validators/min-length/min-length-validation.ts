import { InvalidFieldError } from "../errors"
import { FieldValidation } from "../protocols/field-validation"

export class MinLenghtValidation implements FieldValidation {
  constructor(readonly field: string, private readonly minlenght: number) { }

  validate(value: string) {
    return value.length > this.minlenght ? null : new InvalidFieldError()
  }
}

