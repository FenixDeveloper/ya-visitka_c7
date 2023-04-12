import React, { FC, useState } from 'react';
import styles from './Comments.module.scss';

export const Comments: FC = () => {
  return (
    <>
      <div className={styles.tableHead}>
        <p className={styles.tableHeadColumn}>Когорта</p>
        <p className={styles.tableHeadColumn}>Дата</p>
        <p className={styles.tableHeadColumn}>Отправитель</p>
        <p className={styles.tableHeadColumn}>Получатель</p>
        <p className={styles.tableHeadColumn}>Откуда комментарий</p>
        <p className={styles.tableHeadColumn}>Текст комментария</p>
      </div>
      <div className={styles.tableRow}>
        <p
          className={styles.tableData}
        >
          07
        </p>
        <p className={styles.tableData}>12.04.2023</p>
        <p className={styles.tableData}>Дмитрий Степанов</p>
        <p className={styles.tableData}>Виктория Тихомирова</p>
        <p className={styles.tableData}>из блока Увлечения</p>
        <p className={styles.tableData}>
          Классные у тебя увлечения, я тоже играю в настолки, любимая игра —
          Эволюция. Люблю еще слушать музыку, ходить в кино, общаться с
          друзьями. Ну и учиться в Практикуме.{' '}
        </p>
      </div>
    </>
  );
};
