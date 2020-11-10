// __tests__/fetch.test.js
import React from 'react'
import { render, RenderResult, fireEvent, screen, waitFor } from '@testing-library/react'
import Login from './login';
import ValidationSpy from '@/presentation/test/mock-validation';
import faker from "faker";
import AuthenticationSpy from '@/presentation/test/mock-authentication';
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error';
import { Router } from "react-router-dom"
import { createMemoryHistory } from "history"

type SutTypes = {
  sut: RenderResult
  validationSpy: ValidationSpy
  authenticationSpy: AuthenticationSpy
}

const simulateValidSubmit = (
  sut: RenderResult,
  email = faker.internet.email(),
  password = faker.internet.password()
) => {

  const emailInput = sut.getByTestId('email')
  const passwordInput = sut.getByTestId('password')

  fireEvent.input(passwordInput, { target: { value: password } })
  fireEvent.input(emailInput, { target: { value: email } })

  const submitButton = sut.getByTestId('login-button')
  fireEvent.click(submitButton)
}
const populateEmailField = (sut: RenderResult,
  email = faker.internet.email(),) => {
  const emailInput = sut.getByTestId('email')
  fireEvent.input(emailInput, { target: { value: email } })
}

const populatePasswordField = (sut: RenderResult,
  password = faker.internet.password()) => {
  const passwordInput = sut.getByTestId('password')
  fireEvent.input(passwordInput, { target: { value: password } })
}

const submitButton = (sut: RenderResult) => {
  const submitButton = sut.getByTestId('login-button')
  fireEvent.click(submitButton)
}

const history = createMemoryHistory()
const makeSut = (errorMessage?: string): SutTypes => {
  const validationSpy = new ValidationSpy();
  const authenticationSpy = new AuthenticationSpy();
  validationSpy.errorMessage = errorMessage
  const sut = render(
    <Router history={history}>
      <Login validation={validationSpy} authentication={authenticationSpy} />
    </Router>
  )
  return {
    sut,
    validationSpy,
    authenticationSpy
  }
}
describe('Login tests', () => {
  xtest('Ensure not render spinner and error on start', () => {
    const { sut } = makeSut()
    const { getByTestId } = sut

    const errorWrap = getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)
  })

  xtest('Ensure login button is disabled', () => {
    const { sut } = makeSut()
    const { getByTestId } = sut

    const loginButton = getByTestId('login-button') as HTMLButtonElement
    expect(loginButton.disabled).toBe(true)
  })

  xtest('Should call validation with correct email', () => {
    const { sut, validationSpy } = makeSut();
    const emailInput = sut.getByTestId('email')
    const email = faker.internet.email()

    fireEvent.input(emailInput, { target: { value: email } })

    expect(validationSpy.fieldName).toEqual("email")
    expect(validationSpy.fieldValue).toEqual(email)

  })

  xtest('Should call validation with correct password', () => {
    const { sut, validationSpy } = makeSut();
    const passwordInput = sut.getByTestId('password')
    const password = faker.internet.password()

    fireEvent.input(passwordInput, { target: { value: password } })

    expect(validationSpy.fieldName).toEqual("password")
    expect(validationSpy.fieldValue).toEqual(password)
  })

  xtest('Should show email error if validation fails', () => {
    const { sut, validationSpy } = makeSut(faker.random.words());
    const emailInput = sut.getByTestId('email')
    const email = faker.internet.email()

    fireEvent.input(emailInput, { target: { value: email } })
    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toEqual(validationSpy.errorMessage)
  })

  xtest('Should show password error if validation fails', () => {
    const { sut, validationSpy } = makeSut(faker.random.words());
    const passwordInput = sut.getByTestId('password')
    const password = faker.internet.password()

    fireEvent.input(passwordInput, { target: { value: password } })
    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toEqual(validationSpy.errorMessage)
  })

  xtest('Should not show password error because validation works', () => {
    const { sut, validationSpy } = makeSut();
    validationSpy.errorMessage = null
    const passwordInput = sut.getByTestId('password')
    const password = faker.internet.password()

    fireEvent.input(passwordInput, { target: { value: password } })
    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toEqual('passwordSuccess')
  })

  xtest('Should not show email error because validation works', () => {
    const { sut, validationSpy } = makeSut();
    validationSpy.errorMessage = null
    const emailInput = sut.getByTestId('email')
    const email = faker.internet.email()

    fireEvent.input(emailInput, { target: { value: email } })
    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toEqual('emailSuccess')
  })

  test('Should call Authentication with correct values', () => {
    const { sut, authenticationSpy } = makeSut()

    const password = faker.internet.password()
    const email = faker.internet.email()
    simulateValidSubmit(sut, email, password)
    expect(authenticationSpy.params).toEqual({
      email,
      password
    })

  })

  test('Should call atuthentication only once', () => {
    const { sut, authenticationSpy } = makeSut()
    simulateValidSubmit(sut)
    expect(authenticationSpy.callsCount).toBe(1)
  })

  test('Should not call authentication if form is invalid', () => {
    const validationError = faker.random.words()

    const { sut, authenticationSpy } = makeSut(validationError)
    populateEmailField(sut)
    fireEvent.submit(sut.getByTestId('form'))
    expect(authenticationSpy.callsCount).toBe(0)
  })

  test('Should present error if Authentication fails', async () => {
    const { sut, authenticationSpy } = makeSut()
    const error = new InvalidCredentialsError()
    jest.spyOn(authenticationSpy, 'auth').mockReturnValueOnce(Promise.reject(error))
    simulateValidSubmit(sut)
    const errorWrap = sut.getByTestId("error-wrap")
    await waitFor(() => errorWrap)

    const mainError = sut.getByTestId("main-error")
    expect(mainError.textContent).toBe(error.message)
    expect(errorWrap.childElementCount).toBe(1)
  })

  test('Should go to register page', async () => {
    const { sut } = makeSut()
    const signup = sut.getByTestId('signup')
    fireEvent.click(signup)
    expect(history.length).toBe(2)
    expect(history.location.pathname).toBe("/signup")
  })
})
