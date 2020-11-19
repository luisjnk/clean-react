import { InvalidFieldError } from "../errors"
import { MinLenghtValidation } from "./min-length-validation"
import faker from "faker";

describe('Min Lenght', () => {
	test('Should return error if field is an empty', () => {
		const sut = new MinLenghtValidation("email", 3)
		const error = sut.validate('')
		expect(error).toEqual(new InvalidFieldError())
	})

	test('Should return error if field have less than 3', () => {
		const sut = new MinLenghtValidation("email", 3)
		const error = sut.validate('ab')
		expect(error).toEqual(new InvalidFieldError())
	})

	test('Should not return error because the field lenght is greather than 3', () => {
		const sut = new MinLenghtValidation("email", 3)
		const error = sut.validate(faker.internet.email())
		expect(error).toBeFalsy()
	})

})
