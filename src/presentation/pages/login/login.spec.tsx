// __tests__/fetch.test.js
import React from 'react'
import { render, RenderResult, fireEvent, screen } from '@testing-library/react'
import Login from './login';
import { ERROR_MESSAGES } from '@/presentation/utils/contants';
import { Validation } from '@/presentation/protocols/validation';

type SutTypes = {
  sut: RenderResult
  validationSpy: ValidationSpy
}

class ValidationSpy implements Validation {
  errorMessage: string
  input: object

  validate(input: object): string {
    this.input = input
    return this.errorMessage
  }
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy();
  const sut = render(<Login validation={validationSpy} />)
  return {
    sut,
    validationSpy
  }
}
describe('Login tests', () => {
  test('Ensure not render spinner and error on start', () => {
    const { sut } = makeSut()
    const { getByTestId } = sut

    const errorWrap = getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)
  })

  test('Ensure login button is disabled', () => {
    const { sut } = makeSut()
    const { getByTestId } = sut

    const loginButton = getByTestId('login-button') as HTMLButtonElement
    expect(loginButton.disabled).toBe(true)
  })

  test('Should call validation with correct email', () => {
    const { sut, validationSpy } = makeSut();
    const emailInput = sut.getByTestId('email')

    fireEvent.input(emailInput, { target: { value: 'any_email' } })
    expect(validationSpy.input).toEqual({ email: 'any_email' })
  })

  test('Should call validation with correct password', () => {
    const { sut, validationSpy } = makeSut();
    const passwordInput = sut.getByTestId('password')

    fireEvent.input(passwordInput, { target: { value: 'any_password' } })
    expect(validationSpy.input).toEqual({ password: 'any_password' })
  })
})
