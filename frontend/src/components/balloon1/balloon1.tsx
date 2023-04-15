import { FC } from 'react';
import styles from './Balloon.module.scss';

type BalloonProps = {
  name: string;
  city: string;
  preview: string;
};

export const Balloon: FC<BalloonProps> = ({ name, city, preview }) => {
  return (
    <>
      {name && city && preview && (
        <div className={styles.balloon}>
          <img className={styles.image} src={preview} alt={name} />
          <div className={styles.content}>
            <p className={styles.text}>{name}</p>
            <p className={`${styles.text} ${styles.text_type_city}`}>{city}</p>
          </div>
        </div>
      )}
    </>
  );
};
