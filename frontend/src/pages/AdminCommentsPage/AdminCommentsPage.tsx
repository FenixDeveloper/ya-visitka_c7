import React, { FC, useState } from 'react';
import styles from './AdminCommentsPage.module.scss';
import { NavLink } from 'react-router-dom';
import { Comments } from '../../components/Comments/Comments';
import { EXAMPLE_COMMENTS_ARRAY } from '../../utils/constants';

export const AdminCommentsPage: FC = () => {
  const [query, setQuery] = useState('');
  const [commentsData, setCommentsData] = useState(EXAMPLE_COMMENTS_ARRAY);
  const [filterResult, setFilterResult] = useState(commentsData);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const results = commentsData.filter(comment => {
      if (e.target.value === '') return commentsData
      return (comment.cohort.toLowerCase().includes(e.target.value.toLowerCase()) 
         || comment.sender.toLowerCase().includes(e.target.value.toLowerCase()))
    });
    setFilterResult(results);
    setQuery(e.target.value);
  }

  const comments = filterResult.map((comment, i) => {
    return (
      <Comments
        key={i}
        cohort={comment.cohort}
        date={comment.date}
        sender={comment.sender}
        recipient={comment.recipient}
        from={comment.from}
        text={comment.text}
      />
    );
  });

  return (
    <>
      <section className={styles.main}>
        <div className={styles.linkSection}>
          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              isActive ? styles.link + ' ' + styles.link_active : styles.link
            }
          >
            студенты
          </NavLink>
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              isActive ? styles.link + ' ' + styles.link_active : styles.link
            }
          >
            комментарии
          </NavLink>
        </div>
        <p className={styles.filter_text}>Фильтровать</p>
        <input
          className={styles.filter_input}
          type="text"
          onChange={handleChange}
          value={query}
          placeholder="По имени или фамилии или почте или номеру когорты (введите любой из этих параметров)"
        />
        <div className={styles.tableHead}>
          <p className={styles.tableHeadColumn}>Когорта</p>
          <p className={styles.tableHeadColumn}>Дата</p>
          <p className={styles.tableHeadColumn}>Отправитель</p>
          <p className={styles.tableHeadColumn}>Получатель</p>
          <p className={styles.tableHeadColumn}>Откуда комментарий</p>
          <p className={styles.tableHeadColumn}>Текст комментария</p>
        </div>
        <ul className={styles.comments_list}>{comments}</ul>
      </section>
    </>
  );
};
