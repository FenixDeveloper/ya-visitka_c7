import React, { FC } from 'react';
import styles from './Input.module.scss';
import { EXAMPLE_DEFAUT_ARR, MONTHS } from '../../utils/constants';
import { getListYears } from '../../utils/utils';
import DatePicker from 'react-datepicker';
import '../../assets/react-datepicker.css';
import { ProfileContext } from '../../services/profileContext';
import { IInputProps } from '../../services/types/data';


export const Input: FC<IInputProps> = ({ type = 'text', name, label, arrValues = EXAMPLE_DEFAUT_ARR, placeholder, onChange, value, errorMessage }) => {
  const [valueSelect, setValueSelect] = React.useState(value? value : arrValues[0]);
  const [isVisible, setIsVisible] = React.useState(false);
  const [startDate, setStartDate] = React.useState(new Date(1990, 0, 7));
  const years = getListYears(1980);
  const [inputs, setInputs] = React.useContext(ProfileContext);

  function handleClick() {
    isVisible ? setIsVisible(false) : setIsVisible(true);
  }

  function changeSelectedOption(item: string) {
    setValueSelect(item); 
    setIsVisible(false); 
    setInputs({ ...inputs, select: item });
  }

  function changeSelectedDate(date: Date) {
    setStartDate(date!);
    setInputs({ ...inputs, date: date! });
  }

  const changeValueSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueSelect(e.target.value);
  };
  
  if (type === 'select') {
    return (
      <>
        {label && <label className={styles.input__label}>{label}</label>}
        <div className={styles.select}>
          <button className={isVisible ? styles.button_active : styles.button} onClick={handleClick}>{valueSelect}</button>
          {isVisible && <ul className={styles.list}>
            {arrValues.map((item, index) => (
              <li className={styles.list__item} onClick={() => changeSelectedOption(item)} key={index}>{item}</li>
            ))}
          </ul>}
          <input className={styles.select__input} type='text' name={name} value={valueSelect} onChange={changeValueSelect} />
        </div>
        {errorMessage && <span className={styles.input__error}>{errorMessage}</span>}
      </>
    )

  } else if (type === 'file') {
    return (
      <>
        {label && <label className={styles.input__label}>{label}</label>}
        <input className={styles.input} type={type} name={name} value={value} onChange={onChange} />
        {errorMessage && <span className={styles.input__error}>{errorMessage}</span>}
      </>
    )

  } else if (type === 'textarea') {
    return (
      <>
        {label && <label className={styles.input__label}>{label}</label>}
        <textarea className={styles.textarea} value={value} onChange={onChange} name={name} placeholder={placeholder ? placeholder : 'Не более 300 символов'} />
        {errorMessage && <span className={styles.input__error}>{errorMessage}</span>}
      </>
    )

  } else if (type === 'date') {
    return (
      <>
        {label && <label className={styles.input__label}>{label}</label>}
        <DatePicker 
          selected={startDate} 
          onChange={(date: Date) => changeSelectedDate(date!)}
          dateFormat='dd.MM.yyyy'
          maxDate={new Date()}
          popperPlacement='bottom-end'
          renderCustomHeader={({ date, changeYear, changeMonth }) => (
            <div className={styles.datePicker}>
              <select value={date.getFullYear()} onChange={({ target: { value } }) => changeYear(Number(value))} className={styles.datePicker__select}>
                {years.map(option => (
                  <option key={option} value={option} className={styles.datePicker__option}>
                    {option}
                  </option>
                ))}
              </select>
              <select value={MONTHS[date.getMonth()]} onChange={({ target: { value } }) => changeMonth(MONTHS.indexOf(value)) } className={styles.datePicker__select}>
                {MONTHS.map(option => (
                  <option key={option} value={option} className={styles.datePicker__option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          )}
        />
        {errorMessage && <span className={styles.input__error}>{errorMessage}</span>}
      </>
    )
    
  } else {
    return (
      <>
        {label && <label className={styles.input__label}>{label}</label>}
        <input className={styles.input} type={type} value={value} onChange={onChange} name={name} placeholder={placeholder ? placeholder : ''}/>
        {errorMessage && <span className={styles.input__error}>{errorMessage}</span>}
      </>
    )
  }
}
