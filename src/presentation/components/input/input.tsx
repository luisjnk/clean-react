import React, { useContext } from 'react';
import Styles from './input-style.scss';
import Context from '@/presentation/context/form/form-context';
import Required from './required/required';


type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const Input: React.FC<Props> = (props: Props) => {
  const { state, setState } = useContext(Context)

  const handleChange = (event: React.FocusEvent<HTMLInputElement>): void => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }
  const getStatus = () => {
    return <Required name={props.name} />
  }

  return (
    <div className={Styles.inputWrap}>
      <input data-testid={props.name} {...props} onChange={handleChange}></input>
      {getStatus()}
    </div>
  )
}

export default Input;