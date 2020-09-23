import React from 'react';
import Styles from './login-style.scss';
import {
  LoginHeader,
  Input,
  Footer,
  FormStatus
} from '@/presentation/components/';

const Login: React.FC = () => {
  return (
    <div className={Styles.login}>
      <LoginHeader />
      <form className={Styles.form}>
        <h2>Login</h2>
        <Input type="email" name="email" placeholder="Please enter your email" />
        <Input type="password" name="password" placeholder="Please enter your password" />

        <button className={Styles.submit} type="submit"> Login </button>
        <span className={Styles.link}>Sign up</span>
        <FormStatus />
      </form>
      <Footer />
    </div>
  )
}

export default Login;