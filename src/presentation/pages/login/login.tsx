import React from 'react';
import Styles from './login-style.scss';
import Spinner from '@/presentation/components/spinner/spinner';
import LoginHeader from '@/presentation/components/login-header/login-header';
import Footer from "@/presentation/components/footer/footer";
import Input from '@/presentation/components/input/input';

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
        <div className={Styles.errorWrap}>
          <Spinner className={Styles.spinner} />
          <span className={Styles.error}>Error</span>
        </div>
      </form>
      <Footer />
    </div>
  )
}

export default Login;