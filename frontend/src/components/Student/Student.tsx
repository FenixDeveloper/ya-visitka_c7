import React, { FC } from 'react';
import styles from './Student.module.scss';
import { NavLink } from 'react-router-dom';

type TStudent = {
  cohort: string;
  email: string;
  name: string;
};

export const Student: FC<TStudent> = ({ cohort, email, name }) => {
  
  return (
    <li className={styles.item}>
      <div className={styles.cohort_wrapper}>
        <NavLink 
          className={styles.cohort_link}
          to={`/cohort/${cohort}`}
        >{'>'}</NavLink>
        <p className={styles.cohort}>{cohort}</p>
      </div>
      <p className={styles.email}>{email}</p>
      <p className={styles.name}>{name}</p>
    </li>
  );
};
