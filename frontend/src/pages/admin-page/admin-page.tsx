import React, { FC } from 'react';
import styles from './admin-page.module.scss'
import { EXAMPLE_USERS } from '../../utils/constants';

export const AdminPage: FC = () => {

  const changeToken = (token: string): void => {
    localStorage.setItem('accessToken', token);
  }
    
  const arrayUsers = EXAMPLE_USERS.map(item => {
    if (item.role === 'user') {
      return (
        <button className={styles.admin__button} 
          type='button' 
          onClick={() => changeToken(item.token)} 
          key={item._id}
        >
          <img className={styles.admin__avatar} src={item.avatar}></img>
          <p className={styles.admin__text}>{item.name}</p>
        </button>
      )
    }
  })  

  const arrayAdmins = EXAMPLE_USERS.map(item => {
    if (item.role === 'admin') {
      return (
        <button 
          className={styles.admin__button} 
          type='button' 
          onClick={() => changeToken(item.token)} 
          key={item._id}
        >
          <img className={styles.admin__avatar} src={item.avatar}></img>
          <p className={styles.admin__text}>{item.name}</p>
        </button>
      )
    }
  })

  return (
    <section className={styles.admin}>
      <div className={styles.admin__container}>
        <h2 className={styles.admin__title}>Администраторы:</h2>
        {arrayAdmins}
        <h2 className={styles.admin__title}>Пользователи:</h2>
        {arrayUsers}
      </div>
    </section>
  )
}