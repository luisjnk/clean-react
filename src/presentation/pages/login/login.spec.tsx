// __tests__/fetch.test.js
import React from 'react'
import { render, RenderResult, waitFor, screen } from '@testing-library/react'
import Login from './login';
import { ERROR_MESSAGES } from '@/presentation/utils/contants';

type SutTypes = {
  sut: RenderResult
}

const makeSut = (): SutTypes => {
  const sut = render(<Login />)
  return {
    sut
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
    const { getByTestId } = render(<Login />)
    const loginButton = getByTestId('login-button') as HTMLButtonElement
    expect(loginButton.disabled).toBe(true)
  })


  test('Ensure login button is disabled', () => {
    const { sut } = makeSut()
    const { getByTestId } = sut
    
    const emailStatus = getByTestId('email-status')
    expect(emailStatus.title).toBe(ERROR_MESSAGES.REQUIRED_FIELD)

    const passwordStatus = getByTestId('password-status')
    expect(passwordStatus.title).toBe(ERROR_MESSAGES.REQUIRED_FIELD)
  })
})