import React, { FC, useState } from 'react';
import styles from './Student.module.scss';
import { NavLink } from 'react-router-dom';
import api from '../../utils/api-config';
import { UpdateField } from '../../services/types/data';
import { usePrevious } from '../../utils/utils';
import trash from '../../assets/icons/trash.svg';


type TStudent = {
  cohort: string;
  email: string;
  name: string;
  id: string;
  fromFile: boolean;
  handleDelete?: () => void;
  handleUpdate: () => void;
}; 

export const Student: FC<TStudent> = ({ cohort, email, name, id, fromFile, handleDelete, handleUpdate }) => {

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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, updateField: UpdateField) => {
    const target = e.target as HTMLInputElement;
    if (e.key === 'Enter') {
      if (updateField === UpdateField.EMAIL) {
        if (previousEmail && target.value.toLowerCase() === previousEmail.toLowerCase()) {
          setInputReadOnlyState({...inputReadOnlyState, email: true});
          return;
        }
        setInputValue({...inputValue, email: target.value});
      }
      if (updateField === UpdateField.COHORT) {
        if (previousCohort && target.value === previousCohort) {
          setInputReadOnlyState({...inputReadOnlyState, cohort: true});
          return;
        }
        setInputValue({...inputValue, cohort: target.value});
      }
      api.putUsers('Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IlNtdGhPZlZhbHVlQHlhbmRleC5ydSIsInJvbGUiOiJjdXJhdG9yIiwiaWF0IjoxNjgxNDcxNjE0LCJleHAiOjE2ODIwNzY0MTR9.pAZhCpunPy7S8kz3RNheSoZKyj7tZi-Y78wYaycf82Y', inputValue, id)
        .then(student => 
          setInputValue({
            cohort: student[0].cohort,
            email: student[0].email
          })
        )
      if (updateField === UpdateField.COHORT) {
        setInputReadOnlyState({...inputReadOnlyState, cohort: true});
      }
      if (updateField === UpdateField.EMAIL) {
        setInputReadOnlyState({...inputReadOnlyState, email: true});
      }      
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
          onKeyDown={(e) => handleKeyDown(e, UpdateField.COHORT)}
          onChange={handleCohortChange}
          onClick={handleClick}/>
      </div>
      <input 
        className={styles.email}
        id='email'
        readOnly={inputReadOnlyState.email}
        type='email'
        value={inputValue.email}
        onKeyDown={(e) => handleKeyDown(e, UpdateField.EMAIL)}
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
