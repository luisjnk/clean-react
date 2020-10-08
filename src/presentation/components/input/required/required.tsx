import React, { useContext } from 'react';
import Styles from '../input-style.scss';
import Context from '@/presentation/context/form/form-context';


const Required = ({name}) => {
  const value = useContext(Context)
  const error = value.state[`${name}Error`]
  const requiredClass = error ? Styles.required : Styles.requiredSuccess
  
  const getTitle = () => {
    return error ? error : `${name}Success` 
  }

  return (
    <>
      <span data-testid={`${name}-status`} title={getTitle()} className={requiredClass}></span>
    </>
  )
}

export default Required;