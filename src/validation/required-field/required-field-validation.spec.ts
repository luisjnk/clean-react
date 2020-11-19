import {RequiredFieldError} from "../errors/require-field.error";
import RequiredFieldValidation from "./require-field.validation";
import faker from "faker";

const makeSut = (): RequiredFieldValidation => new RequiredFieldValidation("email")

describe('RequiredFieldValidation', () => {
  test('Should return error if field is an empty', () => {
    const sut = makeSut()
    const error = sut.validate('')
    expect(error).toEqual(new RequiredFieldError())
  })

  test('Should return falsy if field is not empty', () => {
    const sut = makeSut()
    const error = sut.validate(faker.random.word())
    expect(error).toBeFalsy()
  })
})
