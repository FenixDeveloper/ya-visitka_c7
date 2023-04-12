import React, { FC } from 'react';
import styles from './AdminCommentsPage.module.scss';
import { NavLink } from 'react-router-dom';
import { Comments } from '../../components/Comments/Comments';

export const AdminCommentsPage: FC = () => {
  return (
    <>
      <h1>Административная страница: модерирование комментариев</h1>
      <section className={styles.main}>
        <div className={styles.linkSection}>
          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              isActive ? `${styles.link_active}` : `${styles.link_no_active}`
            }
          >
            СТУДЕНТЫ
          </NavLink>
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              isActive ? `${styles.link_active}` : `${styles.link_no_active}`
            }
          >
            КОММЕНТАРИИ
          </NavLink>
        </div>
        <Comments />
      </section>
    </>
  );
};
