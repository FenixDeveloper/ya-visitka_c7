import React, { FC, useState } from 'react';
import styles from './Student.module.scss';
import { NavLink } from 'react-router-dom';

type TStudent = {
  cohort: string;
  email: string;
  name: string;
  id: string;
};

export const Student: FC<TStudent> = ({ cohort, email, name, id }) => {

  const [inputReadOnlyState, setInputReadOnlyState] = useState({ 
    cohort: true,
    email: true
  });
  const [inputValue, setInputValue] = useState({ 
    cohort: cohort,
    email: email
  });

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

  const handleCohortKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setInputValue({...inputValue, cohort: target.value});
    if (e.key === 'Enter') {
      console.log({
        'email': inputValue.email,
        'cohort': target.value
      });
      setInputReadOnlyState({...inputReadOnlyState, cohort: true});
    }
  }

  const handleEmailKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setInputValue({...inputValue, email: target.value});
    if (e.key === 'Enter') {
      console.log({
        'email': target.value,
        'cohort': inputValue.cohort
      });
      setInputReadOnlyState({...inputReadOnlyState, email: true});
    }
  }
  
  return (
    <li className={styles.item}>
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
          onKeyDown={handleCohortKeyDown}
          onChange={handleCohortChange}
          onClick={handleClick}/>
      </div>
      <input 
        className={styles.email}
        id='email'
        readOnly={inputReadOnlyState.email}
        type='email'
        value={inputValue.email}
        onKeyDown={handleEmailKeyDown}
        onChange={handleEmailChange}
        onClick={handleClick}/>
      {name !== '' && 
      <NavLink 
        className={styles.name}
        to={`/profiles/${id}`}
      >
        {name}
      </NavLink>
      }
    </li>
  );
};
