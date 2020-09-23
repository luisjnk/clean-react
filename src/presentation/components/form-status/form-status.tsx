import React from 'react';
import Styles from './form-status-style.scss';
import Spinner from '../spinner/spinner';

const FormStatus: React.FC = () => {
  return (
    <div className={Styles.errorWrap}>
      <Spinner className={Styles.spinner} />
      <span className={Styles.error}>Error</span>
    </div>
  )
}

export default FormStatus;