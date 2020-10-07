import React, { useContext } from 'react';
import Styles from './form-status-style.scss';
import Spinner from '../spinner/spinner';
import FormContext from '../../context/form/form-context';

const FormStatus: React.FC = () => {
  const { state } = useContext(FormContext);
  const { isLoading, isError} = state 
  
  return (
    <div data-testid={"error-wrap"} className={Styles.errorWrap}>
      {isLoading && <Spinner className={Styles.spinner} />}
      {isError && <span className={Styles.error}>Error</span>}
    </div>
  )
}

export default FormStatus;