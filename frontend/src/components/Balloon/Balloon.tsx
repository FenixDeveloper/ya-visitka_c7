import { FC } from 'react';
import styles from './Balloon.module.scss';

type BalloonProps = {
  name: string;
  city: string;
  preview: string;
};

export const Balloon: FC<BalloonProps> = ({ name, city, preview }) => {
  return (
    <div className={styles.balloon}>
      <img className={styles.image} src={preview} />
      <div className={styles.content}>
        <p className={styles.name}>{name}</p>
        <p className={styles.city}>{city}</p>
      </div>
    </div>
  );
};
