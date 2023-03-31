import React, { MouseEventHandler } from 'react';
import styles from './Input.module.scss';

const defaultArr = ['Петров Вал (Волгоградская область)', 'Петровск (Саратовская область)', 'Петровск-Забайкальский (Забайкальский край)', 'Петрозаводск (Республика Карелия)', 'Петропавловск-Камчатский (Камчатский край)']


export const Input = ({ type = 'text', name, arrValues = defaultArr }: {type: string, name?: string, arrValues?: string[]}) => {
  const [value, setValue] = React.useState('');
  const [isVisible, setIsVisible] = React.useState(false);
  const inputButton = document.querySelector('.Input_button__Dhtg5');

  function handleChange(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) {
    setValue(e.target.value);
  }

  function handleClick() {
    isVisible ? setIsVisible(false) : setIsVisible(true);
    inputButton?.classList.toggle('button_active');
  }
  
  if (type === 'select') {
    return (
      <div className={styles.select}>
        <button className={styles.button} onClick={handleClick}>{value}</button>
        {isVisible && <ul className={styles.list}>
          {arrValues.map((item, index) => (
            <li className={styles.list__item} key={index}>{item}</li>
          ))}
        </ul>}
        <input type="text" value={value} onChange={handleChange} name="select" className={styles.select__input}/>
      </div>
    )
  } else {
    return (
      <input className={styles.input} type={type} value={value} onChange={handleChange} name={name} />
    )
  }
}