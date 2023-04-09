import React, { FC } from 'react';
import styles from './Input.module.scss';
import { EXAMPLE_DEFAUT_ARR, MONTHS, PATTERN_ARR } from '../../utils/constants';
import { getListYears } from '../../utils/utils';
import DatePicker from 'react-datepicker';
import '../../assets/react-datepicker.css';
import { ProfileContext } from '../../services/profileContext';
import { IInputProps } from '../../services/types/data';


export const Input: FC<IInputProps> = ({ type = 'text', name, label, arrValues = EXAMPLE_DEFAUT_ARR, placeholder, onChange, value, errorMessage, caption }) => {
  const [profileState, setProfileState] = React.useContext(ProfileContext);
  const [valueSelectCity, setValueSelectCity] = React.useState(value? value : arrValues[0]);
  const [valueSelectPattern, setValueSelectPattern] = React.useState(value? value : arrValues[0]);
  const [avatar, setAvatar] = React.useState(profileState.avatar);
  const [isVisible, setIsVisible] = React.useState(false);
  const years = getListYears(1980);

  function handleClick() {
    isVisible ? setIsVisible(false) : setIsVisible(true);
  }

  function changeSelectedOptionCity(item: string) {
    setValueSelectCity(item); 
    setIsVisible(false); 
    setProfileState({ ...profileState, formCity: item });
  }

  function changeSelectedOptionPattern(item: string) {
    setValueSelectPattern(item); 
    setIsVisible(false); 
    setProfileState({ ...profileState, formPattern: item });
  }

  function changeSelectedDate(date: Date) {
    setProfileState({ ...profileState, formBirthday: date! });
  }

  const changeValueSelectPattern = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueSelectPattern(e.target.value);
  };

  const changeValueSelectCity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueSelectCity(e.target.value);
  };

  const uploadAvatar = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.value;
    setAvatar(file);
    console.log(file);
    
    if (file) {
      const data = new FormData();
      data.append('file', file);
      // axios.post('/files', data)...
      setProfileState({ ...profileState, formAvatar: file });
    }
  }
  
  if (type === 'select' && arrValues === PATTERN_ARR) {
    return (
      <>
        {label && <label className={styles.input__label}>{label}</label>}
        <div className={styles.select}>
          <button className={isVisible ? styles.button_active : styles.button} onClick={handleClick}>{valueSelectPattern}</button>
          {isVisible && <ul className={styles.list}>
            {arrValues.map((item, index) => (
              <li className={styles.list__item} onClick={() => changeSelectedOptionPattern(item)} key={item}>{item}</li>
            ))}
          </ul>}
          <input className={styles.select__input} type='text' name={name} value={valueSelectPattern} onChange={changeValueSelectPattern} />
        </div>
        {errorMessage && <span className={styles.input__error}>{errorMessage}</span>}
      </>
    )

  } else if (type === 'select' && arrValues !== PATTERN_ARR) {
    return (
      <>
        {label && <label className={styles.input__label}>{label}</label>}
        <div className={styles.select}>
          <button className={isVisible ? styles.button_active : styles.button} onClick={handleClick}>{valueSelectCity}</button>
          {isVisible && <ul className={styles.list}>
            {arrValues.map((item, index) => (
              <li className={styles.list__item} onClick={() => changeSelectedOptionCity(item)} key={index}>{item}</li>
            ))}
          </ul>}
          <input className={styles.select__input} type='text' name={name} value={valueSelectCity} onChange={changeValueSelectCity} />
        </div>
        {errorMessage && <span className={styles.input__error}>{errorMessage}</span>}
      </>
    )

  } else if (type === 'file') {
    return (
      <>
        {label && <label className={styles.input__label}>{label}</label>}
        <input className={styles.input} type={type} name={name} value={value} onChange={onChange} />
        {caption && <span className={styles.input__caption}>{caption}</span>}
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
          selected={profileState.formBirthday} 
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
    
  } else if (type === 'avatar') {
    return (
      <div className={styles.input__container}>
        {label && <label className={styles.input__label_avatar}>{label}</label>}
        {caption && <span className={styles.input__caption_avatar}>{caption}</span>}
        {avatar && <input type='file' className={styles.avatar_loaded} style={{background: `url('${avatar}') no-repeat center/cover`}}
          onChange={uploadAvatar} />}
        {!avatar && <input type='file' className={styles.avatar} onChange={uploadAvatar} />}
      </div>
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
