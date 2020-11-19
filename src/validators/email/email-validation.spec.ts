import { InvalidFieldError } from "../errors"
import { EmailValidation } from "./email.validation"
import faker from "faker"
describe('EmailValidation', () => {
  test('Should return error if email is invalid', () => {
    const sut = new EmailValidation("email")
    const error = sut.validate(faker.random.word())
    expect(error).toEqual(new InvalidFieldError())
  })

  test('Should error to be false', () => {
    const sut = new EmailValidation("email")
    const error = sut.validate(faker.internet.email())
    expect(error).toBeFalsy()
  })

})
