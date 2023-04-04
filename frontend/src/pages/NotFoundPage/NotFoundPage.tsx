import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';
import { Button } from '../../components/Button/Button';

export const NotFoundPage: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <h1 className={styles.content__heading}>
          <span className={styles.fade} id={styles.digit1}>
            4
          </span>
          <span className={styles.fade} id={styles.digit2}>
            0
          </span>
          <span className={styles.fade} id={styles.digit3}>
            4
          </span>
        </h1>
        <p className={styles.content__paragraph}> 👀 📃 🚫 🔎</p>
        <Link className={styles.content__button} to="/">
          <Button size="small">Вернуться на главную</Button>
        </Link>
      </div>
    </div>
  );
};
