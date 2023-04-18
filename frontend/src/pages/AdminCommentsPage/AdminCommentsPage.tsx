import React, { FC, useState, useEffect } from 'react';
import styles from './AdminCommentsPage.module.scss';
import { NavLink } from 'react-router-dom';
import { Comment } from '../../components/Comment/Comment';
import { ICommentData } from '../../services/types/data';
import { api } from '../../utils/api-config';

export const AdminCommentsPage: FC = () => {
  const [query, setQuery] = useState('');
  const [commentsData, setCommentsData] = useState<ICommentData[]>([]);
  const [filterResult, setFilterResult] = useState<ICommentData[]>([]);

  
  const fetchComments = async () => {
    await api.getComments(0, 20, '').then((data) => {
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
  const filterResultTest = [
    {
      _id: '81ffe58b6fe8dac5328b4f5e',
      from: {
        _id: '88fd917fb9ce1ebbacf35dcb',
        name: 'Brendan Fadel',
        email: 'Buster_Murphy@hotmail.com',
        cohort: 'web+16',
      },
      target: 'hobby',
      text: 'Fugit sint occaecati dicta unde eaque.',
      to: {
        _id: 'a67fdbbc9e4a2f7d962c795c',
        name: 'Gordon Anderson',
        email: 'Kayli72@hotmail.com',
        cohort: 'web+16',
      },
    },
    {
      _id: '0c742efe72f6bc7a140863d6',
      from: {
        _id: '88fd917fb9ce1ebbacf35dcb',
        name: 'Brendan Fadel',
        email: 'Buster_Murphy@hotmail.com',
        cohort: 'web+16',
      },
      target: 'edu',
      text: 'Quas recusandae illo temporibus saepe repudiandae optio eligendi quas pariatur.',
      to: {
        _id: 'a67fdbbc9e4a2f7d962c795c',
        name: 'Gordon Anderson',
        email: 'Kayli72@hotmail.com',
        cohort: 'web+16',
      },
    },
    {
      _id: '47addcbfe138dbdfbecefcd5',
      from: {
        _id: '88fd917fb9ce1ebbacf35dcb',
        name: 'Brendan Fadel',
        email: 'Buster_Murphy@hotmail.com',
        cohort: 'web+16',
      },
      target: 'status',
      text: 'Классные у тебя увлечения, я тоже играю в настолки, любимая игра — Эволюция. Люблю еще слушать музыку, ходить в кино, общаться с друзьями. Ну и учиться в Практикуме.',
      to: {
        _id: 'a67fdbbc9e4a2f7d962c795c',
        name: 'Gordon Anderson',
        email: 'Kayli72@hotmail.com',
        cohort: 'web+16',
      },
    },
    {
      _id: '61c4da18bc63b512fffbe70f',
      from: {
        _id: '88fd917fb9ce1ebbacf35dcb',
        name: 'Brendan Fadel',
        email: 'Buster_Murphy@hotmail.com',
        cohort: 'web+16',
      },
      target: 'job',
      text: 'Dicta placeat voluptates quaerat odio neque minima.78555555555555555555555555555555',
      to: {
        _id: 'a67fdbbc9e4a2f7d962c795c',
        name: 'Gordon Anderson',
        email: 'Kayli72@hotmail.com',
        cohort: 'web+16',
      },
    },
    {
      _id: 'd45e2dbcd98fce99bfaeef61',
      from: {
        _id: '88fd917fb9ce1ebbacf35dcb',
        name: 'Brendan Fadel',
        email: 'Buster_Murphy@hotmail.com',
        cohort: 'web+16',
      },
      target: 'quote',
      text: 'Ipsa amet autem cum.',
      to: {
        _id: 'a67fdbbc9e4a2f7d962c795c',
        name: 'Gordon Anderson',
        email: 'Kayli72@hotmail.com',
        cohort: 'web+16',
      },
    },
    {
      _id: 'eff84876fbd0d069fde0d5fb',
      from: {
        _id: '88fd917fb9ce1ebbacf35dcb',
        name: 'Brendan Fadel',
        email: 'Buster_Murphy@hotmail.com',
        cohort: 'web+16',
      },
      target: 'quote',
      text: 'Tempora veritatis commodi est dicta doloremque animi dicta.',
      to: {
        _id: 'a67fdbbc9e4a2f7d962c795c',
        name: 'Gordon Anderson',
        email: 'Kayli72@hotmail.com',
        cohort: 'web+16',
      },
    },
  ];
  const comments = filterResultTest.map((comment) => {
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
