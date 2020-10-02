import React, { useState, useContext } from 'react';

import {
  LoginHeader,
  Input,
  Footer,
  FormStatus
} from '@/presentation/components/';
import Context from '../../context/form/form-context';

type StatePros = {
  isLoading: boolean,
  isError: boolean
}

const INITAL_STATE: StatePros = {
  isLoading: false,
  isError: false
}

const Register: React.FC = () => {
  const [state] = useState<StatePros>(INITAL_STATE);

  return (
    <div className={"signup"}>
      <LoginHeader />
      <Context.Provider value={state}>
        <form className={"form"}>
          <h2>Register</h2>
          <Input type="name" name="name" placeholder="Please enter your name" />
          <Input type="password" name="password" placeholder="Please enter your password" />
          <Input type="password" name="password" placeholder="Please enter your email" />

          <button data-testid="login-button" disabled className={"submit"} type="submit"> Create Account </button>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default Register;