import React, { useState, useContext, useEffect } from 'react';
import Styles from './login-style.scss';
import {
  LoginHeader,
  Input,
  Footer,
  FormStatus
} from '@/presentation/components/';
import Context from '../../context/form/form-context';
import { ERROR_MESSAGES } from '@/presentation/utils/contants';
import { Validation } from '@/presentation/protocols/validation';
import { Authentication } from '@/domain/usecases/authentication';

type StatePros = {
  isLoading: boolean,
  isError: boolean,
  emailError: string,
  passwordError: string
  email: string,
  password: string
}

const INITAL_STATE: StatePros = {
  isLoading: false,
  isError: false,
  emailError: ERROR_MESSAGES.REQUIRED_FIELD,
  passwordError: ERROR_MESSAGES.REQUIRED_FIELD,
  email: '',
  password: ''
}

type Props = {
  validation: Validation,
  authentication: Authentication
}

const Login: React.FC<Props> = ({ validation, authentication}: Props) => {
  const [state, setState] = useState<StatePros>(INITAL_STATE);

  useEffect(() => {
    setState({...state, emailError: validation.validate("email", state.email)
  })
  }, [state.email])

  useEffect(() => {
    console.log("asdsada", validation.validate("password", state.password))
    setState({...state, passwordError: validation.validate("password", state.password)
  })
  }, [state.password])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    setState({...state, isLoading: true})
    await authentication.auth({
      email: state.email,
      password: state.password
    })
  }

  return (
    <div className={Styles.login}>
      <LoginHeader />
      <Context.Provider value={{state, setState}}>
        <form className={Styles.form} onSubmit={handleSubmit} >
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Please enter your email" />
          <Input type="password" name="password" placeholder="Please enter your password" />

          <button data-testid="login-button" disabled={!!state.emailError || !!state.passwordError} className={Styles.submit} type="submit"> Login </button>
          <span className={Styles.link}>Sign up</span>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default Login;