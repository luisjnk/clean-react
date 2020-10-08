import React, { useContext } from 'react';
import Styles from '../input-style.scss';
import Context from '@/presentation/context/form/form-context';


const Required = ({name}) => {
  const value = useContext(Context)
  const error = value.state[`${name}Error`]
  const getTitle = () => {
    return error  
  }

  return (
    <>
      <span data-testid={`${name}-status`} title={getTitle()} className={Styles.required}></span>
    </>
  )
}

export default Required;