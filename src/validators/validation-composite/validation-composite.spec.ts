import { FieldValidation } from "../protocols/field-validation";
import { ValidationComposite } from "./validation-composite";


class FieldValidationSpy implements FieldValidation {
  error: Error = null

  constructor (readonly field: string) {}
  validate( value: string): Error {
    return this.error
  }
}

describe('ValidationComposite', () => {
  test('Should return error if any validation fails', () => {
    const fieldValidatorSpy = new FieldValidationSpy('any_field')
    const fieldValidatorSpy2 = new FieldValidationSpy('any_field')
    fieldValidatorSpy2.error = new Error('any_error_message')
    const sut = new ValidationComposite([
      fieldValidatorSpy,
      fieldValidatorSpy2
    ])
    const error = sut.validate('any_field', 'any_value');
    expect(error).toBe('any_error_message')
  })

})
