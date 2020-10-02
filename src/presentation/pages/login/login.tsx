import React, { useState, useContext } from 'react';
import Styles from './login-style.scss';
import {
  LoginHeader,
  Input,
  Footer,
  FormStatus
} from '@/presentation/components/';
import Context from '../../context/form/form-context';
import { ERROR_MESSAGES } from '@/presentation/utils/contants';

type StatePros = {
  isLoading: boolean,
  isError: boolean,
  emailError: string,
  passwordError: string
}

const INITAL_STATE: StatePros = {
  isLoading: false,
  isError: false,
  emailError: ERROR_MESSAGES.REQUIRED_FIELD,
  passwordError: ERROR_MESSAGES.REQUIRED_FIELD

}

const Login: React.FC = () => {
  const [state] = useState<StatePros>(INITAL_STATE);

  return (
    <div className={Styles.login}>
      <LoginHeader />
      <Context.Provider value={state}>
        <form className={Styles.form}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Please enter your email" />
          <Input type="password" name="password" placeholder="Please enter your password" />

          <button data-testid="login-button" disabled className={Styles.submit} type="submit"> Login </button>
          <span className={Styles.link}>Sign up</span>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default Login;