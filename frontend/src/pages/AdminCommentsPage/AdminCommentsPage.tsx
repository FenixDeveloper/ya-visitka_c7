import React, { FC, useState, useEffect } from 'react';
import styles from './AdminCommentsPage.module.scss';
import { NavLink } from 'react-router-dom';
import { Comment } from '../../components/Comment/Comment';
import { ICommentData } from '../../services/types/data';
import api from '../../utils/api-config';

export const AdminCommentsPage: FC = () => {
  const [query, setQuery] = useState('');
  const [commentsData, setCommentsData] = useState<ICommentData[]>([]);
  const [filterResult, setFilterResult] = useState<ICommentData[]>([]);

  const bearerToken =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOm51bGwsInJvbGUiOiJjdXJhdG9yIiwiZW1haWwiOiJpdmFuLXZha3VsZW5rb0B5YW5kZXgucnUiLCJpYXQiOjE2ODE3NTYzOTcsImV4cCI6MTY4MjM2MTE5N30.mbkRf-HOLjwSpRENNHJBWrcucnHyt6qKpTU5uFr5SpM';
  const fetchComments = async () => {
    await api.getComments(bearerToken, 0, 20, '').then((data) => {
      setCommentsData(data.items);
      setFilterResult(data.items);
    });
  };
  useEffect(() => {
    fetchComments();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const results = commentsData.filter((comment) => {
      if (e.target.value === '') return commentsData;
      else if (comment.from.name != undefined) {
        return (
          comment.from.name
            .toLowerCase()
            .includes(e.target.value.toLowerCase()) ||
          comment.from.email
            ?.toLowerCase()
            .includes(e.target.value.toLowerCase()) ||
          comment.from.cohort
            ?.toLowerCase()
            .includes(e.target.value.toLowerCase())
        );
      }
    });
    setFilterResult(results);
    setQuery(e.target.value);
  };

  const handleDeleteClick = async (id: string) => {
    await api.deleteComments(bearerToken, id);
    setCommentsData([...commentsData.filter((el) => el._id !== id)]);
    setFilterResult([...filterResult.filter((el) => el._id !== id)]);
  };

  const dateFromObjectId = (objectId: string) => {
    const commentDate = new Date(parseInt(objectId.substring(0, 8), 16) * 1000);
    return `${commentDate.getDate()}.${commentDate.getMonth()}.${commentDate.getFullYear()}`;
  };

  const comments = filterResult.map((comment) => {
    return (
      <Comment
        key={comment._id}
        cohort={comment.from.cohort}
        date={dateFromObjectId(comment._id)}
        sender={comment.from.name}
        recipient={comment.to.name}
        from={comment.target}
        text={comment.text}
        handleDelete={() => handleDeleteClick(comment._id)}
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
            to="admin/comments"
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
