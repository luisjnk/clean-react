import { FieldValidation } from "../protocols/field-validation"

class EmailValidation implements FieldValidation {
  constructor(readonly field: string) { }
  validate(value: string): Error {
    return new InvalidFieldError()
  }
}

class InvalidFieldError extends Error {
  constructor() {
    super("Invalid")
  }
}

describe('EmailValidation', () => {
  test('Should return error if email is invalid', () => {
    const sut = new EmailValidation("email")
    const error = sut.validate('')
    expect(error).toEqual(new InvalidFieldError())
  })

})
