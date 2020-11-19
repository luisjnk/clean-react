import {RequiredFieldError} from "../errors/require-field.error";
import RequiredFieldValidation from "./require-field.validation";

describe('RequiredFieldValidation', () => {
  test('Should return error if field is an empty', () => {
    const sut = new RequiredFieldValidation('error')
    const error = sut.validate('')
    expect(error).toEqual(new RequiredFieldError())
  })
})
