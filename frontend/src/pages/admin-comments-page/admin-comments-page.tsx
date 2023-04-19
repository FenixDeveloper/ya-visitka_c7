import React, { FC, useState, useEffect } from 'react';
import styles from './admin-comments-page.module.scss';
import { NavLink } from 'react-router-dom';
import { Comment } from '../../components/comment/comment';
import { TComment } from '../../services/types/data';
import { api } from '../../utils/api-config';
import { EXAMPLE_COMMENTS } from '../../utils/constants';


export const AdminCommentsPage: FC = () => {
  const [query, setQuery] = useState('');
  const [commentsData, setCommentsData] = useState<TComment[]>([]);
  const [filterResult, setFilterResult] = useState<TComment[]>([]);

  
  const fetchComments = async () => {
    await api.getComments(0, 20, '').then((data) => {
      setCommentsData(data.items);
      setFilterResult(data.items);
    });
  };
  useEffect(() => {
    //закомментировать две следующие строки при запросе данных с сервера
    setCommentsData(EXAMPLE_COMMENTS);
    setFilterResult(EXAMPLE_COMMENTS);
    // раскоментировать при запросе данных с сервера
    //fetchComments();
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
    await api.deleteComments(id);
    setCommentsData([...commentsData.filter((el) => el._id !== id)]);
    setFilterResult([...filterResult.filter((el) => el._id !== id)]);
  };

  //достанем дату из _id базы MongoDB https://steveridout.com/mongo-object-time/

  const dateFromObjectId = (objectId: string) => {
    const commentDate = new Date(parseInt(objectId.substring(0, 8), 16) * 1000);
    return `${
      +commentDate.getDate() < 10
        ? '0' + commentDate.getDate()
        : commentDate.getDate()
    }.${
      +commentDate.getMonth() < 10
        ? '0' + commentDate.getMonth()
        : commentDate.getMonth()
    }.${commentDate.getFullYear()}`;
  };

  const comments = filterResult.map((comment) => {
    return (
      <Comment
        key={comment._id}
        cohort={comment.from.cohort}
        date={dateFromObjectId(comment._id)}
        sender={comment.from.name!}
        recipient={comment.to.name!}
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
            to="/admin/comments"
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
