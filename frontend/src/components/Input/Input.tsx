import React, { ChangeEvent } from 'react';
import styles from './Input.module.scss';
import { defaultArr } from '../../utils/constants';

export const Input = ({ type = 'text', name, arrValues = defaultArr, placeholder }: {type: string, name?: string, arrValues?: string[], placeholder?: string }) => {
  const [valueInput, setValueInput] = React.useState('');
  const [valueSelect, setValueSelect] = React.useState(arrValues[0]);
  const [isVisible, setIsVisible] = React.useState(false);

  function handleChange(e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) {
    setValueInput(e.target.value);
  };

  function handleClick() {
    isVisible ? setIsVisible(false) : setIsVisible(true);
  };
  
  if (type === 'select') {
    return (
      <div className={styles.select}>
        <button className={isVisible ? styles.button_active : styles.button} onClick={handleClick}>{valueSelect}</button>
        {isVisible && <ul className={styles.list}>
          {arrValues.map((item, index) => (
            <li className={styles.list__item} onClick={() => {setValueSelect(item); setIsVisible(false)}} key={index}>{item}</li>
          ))}
        </ul>}
        <input type="text" value={valueInput} onChange={handleChange} name={name} className={styles.select__input}/>
      </div>
    )
  } else if (type === 'file') {
    return (
      <input className={styles.input} type={type} name={name} />
    )
  } else if (type === 'textarea') {
    return (
      <textarea className={styles.textarea} value={valueInput} onChange={handleChange} name={name} placeholder={placeholder ? placeholder : 'Не более 300 символов'} />
    )
  } else {
    return (
      <input className={styles.input} type={type} value={valueInput} onChange={handleChange} name={name} placeholder={placeholder ? placeholder : ''}/>
    )
  }
}