interface FieldValidation {
  field: string,
  validate(value: string): Error
}

class RequiredFieldValidation implements FieldValidation {
  constructor (readonly field: string) {}

  validate(value: string): Error {
    return new RequiredFieldError();
  } 
}

class RequiredFieldError extends Error {
  constructor () {
    super("Campo obrigadtório")
    this.name = "RequiredFieldError"
  }
}

describe('RequiredFieldValidation', () => {
  test('Should return error if field is an empty', () => {
    const sut = new RequiredFieldValidation('error')
    const error = sut.validate('')
    expect(error).toEqual(new RequiredFieldError())
  })
})
