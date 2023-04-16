import React, { FC, SyntheticEvent } from 'react';
import styles from './Comments.module.scss';
import trash from '../../assets/icons/trash.svg';


type TComments = {
  cohort: string;
  date: string;
  sender: string;
  recipient: string;
  from: string;
  text: string;
  onClick?: (() => void) | ((e: SyntheticEvent) => void);
};

export const Comments: FC<TComments> = ({
  cohort,
  date,
  sender,
  recipient,
  from,
  text,
  onClick
}) => {
  return (
    <>
      <div className={styles.tableRow}>
        <p className={styles.tableData}>{cohort}</p>
        <p className={styles.tableData}>{date}</p>
        <p className={styles.tableData}>{sender}</p>
        <p className={styles.tableData}>{recipient}</p>
        <p className={styles.tableData}>{from}</p>
        <p className={styles.tableData}>{text}</p>
        <button className={styles.deleteButton}onClick={onClick}>
          <img src={trash} alt='Нажать для удаления' />
        </button>
      </div>
    </>
  );
};
