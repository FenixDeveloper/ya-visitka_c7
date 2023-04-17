import React, { FC, useState } from 'react';
import styles from './Student.module.scss';
import { NavLink } from 'react-router-dom';
import { TStudentProps, UpdateField } from '../../services/types/data';
import { usePrevious } from '../../utils/utils';
import trash from '../../assets/icons/trash.svg';
import { validation } from '../../utils/validation';


export const Student: FC<TStudentProps> = ({ cohort, email, name, id, fromFile, validationError, handleDelete, handleUpdate }) => {

  const [inputReadOnlyState, setInputReadOnlyState] = useState({ 
    cohort: true,
    email: true
  });
  const [inputValue, setInputValue] = useState({ 
    cohort: cohort,
    email: email
  });

  const previousCohort = usePrevious(inputValue.cohort);
  const previousEmail = usePrevious(inputValue.email);

  const handleCohortChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setInputValue({...inputValue, cohort: target.value})
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setInputValue({...inputValue, email: target.value})
  }
  
  const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (target.id === 'cohort') {
      setInputReadOnlyState({ ...inputReadOnlyState, cohort: false,});
    } else {
      setInputReadOnlyState({ ...inputReadOnlyState, email: false,});
    }
  }

  const handleUpdateOnEnter = (e: React.KeyboardEvent<HTMLInputElement>, updateField: UpdateField) => {
    const target = e.target as HTMLInputElement;
    if (e.key === 'Enter') {
      if (updateField === UpdateField.EMAIL) {
        const validationError = validation.isEmail(target.value);
        if (validationError !== '') {
          console.log(validationError);
          return;
        }
        if (previousEmail && target.value.toLowerCase() === previousEmail.toLowerCase()) {
          setInputReadOnlyState({...inputReadOnlyState, email: true});
          return;
        }
      }
      if (updateField === UpdateField.COHORT) {
        if (previousCohort && target.value === previousCohort) {
          setInputReadOnlyState({...inputReadOnlyState, cohort: true});
          return;
        }
      }
      handleUpdate({id, cohort: inputValue.cohort, email: inputValue.email, fromFile, name, validationError });
      if (updateField === UpdateField.COHORT) {
        setInputReadOnlyState({...inputReadOnlyState, cohort: true});
      }
      if (updateField === UpdateField.EMAIL) {
        setInputReadOnlyState({...inputReadOnlyState, email: true});
      }
    }
  }

  const setEmailStyle = (validationError: boolean) => {
    if (validationError) {
      return styles.email + ' ' + styles.email_invalid
    } else {
      return styles.email
    }
  }

  
  return (
    <li className={fromFile? styles.item_uploaded + ' ' + styles.item : styles.item}>
      <div className={styles.cohort_wrapper}>
        <NavLink 
          className={styles.cohort_link}
          to={`/cohort/${inputValue.cohort}`}
        >{'>'}</NavLink>
        <input 
          className={styles.cohort}
          id='cohort'
          readOnly={inputReadOnlyState.cohort}
          type='text'
          value={inputValue.cohort}
          onKeyDown={(e) => handleUpdateOnEnter(e, UpdateField.COHORT)}
          onChange={handleCohortChange}
          onClick={handleClick}/>
      </div>
      <input 
        className={setEmailStyle(validationError)}
        id='email'
        readOnly={inputReadOnlyState.email}
        type='email'
        value={inputValue.email}
        onKeyDown={(e) => handleUpdateOnEnter(e, UpdateField.EMAIL)}
        onChange={handleEmailChange}
        onClick={handleClick}/>
      <NavLink 
        className={styles.name}
        to={`/profiles/${id}`}
        onClick={(event) => {
          if (name === '') {
            event.preventDefault();
          }
        }}
      >
        {name}
      </NavLink>
      {fromFile &&
        <button 
          className={styles.deleteButton}
          onClick={handleDelete}
        >
          <img src={trash} alt='Нажмите для удаления'/>
        </button>}
    </li>
  );
};
