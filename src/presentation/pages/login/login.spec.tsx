// __tests__/fetch.test.js
import React from 'react'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import Login from './login';
import { ERROR_MESSAGES } from '@/presentation/utils/contants';

describe('Login tests', () => {
  test('Ensure not render spinner and error on start', () => {
    const { getByTestId } = render(<Login />)
    const errorWrap = getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)
  })

  test('Ensure login button is disabled', () => {
    const { getByTestId } = render(<Login />)
    const loginButton = getByTestId('login-button') as HTMLButtonElement
    expect(loginButton.disabled).toBe(true)
  })


  test('Ensure login button is disabled', () => {
    const { getByTestId } = render(<Login />)

    const emailStatus = getByTestId('email-status')
    expect(emailStatus.title).toBe(ERROR_MESSAGES.REQUIRED_FIELD)

    const passwordStatus = getByTestId('password-status')
    expect(passwordStatus.title).toBe(ERROR_MESSAGES.REQUIRED_FIELD)
  })
})