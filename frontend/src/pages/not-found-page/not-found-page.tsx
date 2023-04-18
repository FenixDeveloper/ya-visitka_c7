import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './not-found-page.module.scss';
import { Button } from '../../components/button/button';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

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
          <Button size="small" onClick={() => navigate(-1)}>назад</Button>
        </Link>
      </div>
    </div>
  );
};
