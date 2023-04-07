import React, { FC, useState} from 'react';
import styles from './Visitka.module.scss';
//import { Feedback } from '../Feedback/Feedback';
import chatIcon from '../../assets/icons/chat.svg';

type TVisitka = {
  id: string;
  name: string;
  photo: string;
  city: string;
};

const feedbackTextArrLength = 100; // для тестирования отображения количества сообщений
export const Visitka: FC<TVisitka> = ({ id, name, photo, city }) => {
  const [isFeedbackOpen, setFeedback] = useState(false);

  const openDetailPage = () => {
    console.log('open Detail Page');
  };

  const openFeedback = () => {
    setFeedback(!isFeedbackOpen);
  };

  return (
    <section className={styles.content}>
      <img
        className={styles.photo}
        src={'https://i.pravatar.cc/300'}
        alt="Фото пользователя"
        onClick={openDetailPage}
      ></img>
      <button className={styles.chatButton} onClick={openFeedback}>
        <img className={styles.chatIcon} src={chatIcon} />
        {feedbackTextArrLength  && (
          <div className={`${feedbackTextArrLength > 99 ? styles.countOver99 : ''} ${styles.count}`}>
            <p className={styles.number}>{feedbackTextArrLength > 99 ? '99+' : feedbackTextArrLength}</p>
          </div>
        )}
      </button>
      <div className={styles.userInfo} onClick={openDetailPage}>
        <p className={styles.name}>{'name'}</p>
        <p className={styles.city}>{'city'}</p>
        {'Куратор' && <p className={styles.messageCounter}>{`${feedbackTextArrLength} сообщений`}</p>}
        
      </div>
      {isFeedbackOpen && <div className={styles.feedback}>Здесь должен быть компонент Feedback</div>}
    </section>
  );
};
