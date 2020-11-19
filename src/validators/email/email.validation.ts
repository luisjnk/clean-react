import { InvalidFieldError } from "../errors";
import { FieldValidation } from "../protocols/field-validation";

export class EmailValidation implements FieldValidation {
    constructor(readonly field: string) { }
    validate(value: string): Error {
        const emailregex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailregex.test(value) ? null : new InvalidFieldError()
    }
  }