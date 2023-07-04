import React, { FC, useContext, useState } from 'react';
import styles from './visitka.module.scss';
import { Feedback } from '../feedback/feedback';
import chatIcon from '../../assets/icons/chat.svg';
import { ProfileContext } from '../../services/profile-context';
import { UserStatus } from '../../services/types/data';
import { NavLink } from 'react-router-dom';

type TVisitka = {
  _id: string;
  name: string;
  photo: string;
  city: string;
};

export const Visitka: FC<TVisitka> = ({ _id, name, photo, city }) => {
  const [isFeedbackOpen, setFeedback] = useState(false);
  const [profileState, _] = useContext(ProfileContext);
  const userStatus = profileState.user.role;
  const feedbackTextArrLength = profileState?.reactions?.length;

  const openFeedback = () => {
    setFeedback(!isFeedbackOpen);
  };

  return (
    <article className={styles.content}>
      <NavLink className={styles.navlink} to={`/profiles/${_id}`}>
        <img
          className={styles.photo}
          src={photo}
          alt="Фото пользователя"
        ></img>
        <div className={styles.userInfo}>
          <p className={styles.name}>{name}</p>
          <p className={styles.city}>{city}</p>
          {userStatus === UserStatus.CURATOR && <p className={styles.messageCounter}>{`${feedbackTextArrLength} сообщений`}</p>}

        </div>
      </NavLink>
      <button className={styles.chatButton} onClick={openFeedback}>
        <img className={styles.chatIcon} src={chatIcon} />
        {feedbackTextArrLength>0 && (
          <div className={`${feedbackTextArrLength > 99 ? styles.countOver99 : ''} ${styles.count}`}>
            <p className={styles.number}>{feedbackTextArrLength > 99 ? '99+' : feedbackTextArrLength}</p>
          </div>
        )}
      </button>
      {isFeedbackOpen && (
        <div className={styles.feedback}>
          <div className={styles.feedback__container}>
            <Feedback />
          </div>
        </div>
      )}
    </article>
  );
};
