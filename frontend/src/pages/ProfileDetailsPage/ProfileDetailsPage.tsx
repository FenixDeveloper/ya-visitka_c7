import React, { FC } from 'react';
import styles from './ProfileDetailsPage.module.scss';
import { DEFAULT_PAGE, ROMANTIC_PAGE, COCKY_PAGE, GITHUB_URL, TELEGRAM_URL } from '../../utils/constants';
import { ProfileContext } from '../../services/profileContext';
import telegramIcon from '../../assets/icons/telegram.svg';
import githubIcon from '../../assets/icons/github.svg'
import { Blogs } from '../../components/Blogs/Blogs';
import { Communication } from '../../components/Communication/Communication';


export const ProfileDetailsPage: FC = () => {
  const { user } = React.useContext(ProfileContext);

  return (
    <section className={styles.profileDetails}>
      <div className={styles.profileDetails__container}>
        <div className={styles.profileDetails__infoBox}>
          <h1 className={styles.profileDetails__title}>{user.name}</h1>
          <p className={styles.profileDetails__text}>Калуга</p>
          <div className={styles.profileDetails__iconBox}>
            <a className={styles.profileDetails__iconLink} 
              href={TELEGRAM_URL}
            >
              <div className={styles.profileDetails__icon}
                style={{ backgroundImage: `url(${telegramIcon})`}}
              >
              </div>
            </a>
            <a className={styles.profileDetails__iconLink} 
              href={GITHUB_URL}
            >
              <div className={styles.profileDetails__icon}
                style={{ backgroundImage: `url(${githubIcon})`}}
              >
              </div>
            </a>
          </div>
        </div>
        <div className={styles.profileDetails__avatarBox}>
          <img className={
            `${styles.profileDetails__avatar}
             ${user.pageStyle === ROMANTIC_PAGE && styles.profileDetails__avatar_romantic}`
          }
          src={`${user.avatar}`} 
          alt={`Аватар пользователя ${user.name}`} 
          />
          <div className={`${user.pageStyle === COCKY_PAGE && styles.profileDetails__maskAvatar}`}></div>
        </div>
        <div className={styles.profileDetails__decriptionBox}>
          <div className={styles.profileDetails__communicationBox}>
            <Communication />
          </div>
          <div className={styles.profileDetails__quotesBox}>
            <div className={`${styles.profileDetails__quotesIcon} ${user.pageStyle !== DEFAULT_PAGE && styles.profileDetails__quotesIcon_pink}`}></div>
            <div className={`${styles.profileDetails__quotesIcon} ${user.pageStyle  !== DEFAULT_PAGE && styles.profileDetails__quotesIcon_pink}`}></div>
          </div>
          <p className={`${styles.profileDetails__descriptionText} ${user.pageStyle  !== DEFAULT_PAGE && styles.profileDetails__descriptionText_notDefault}`}>
            Делай, что должно и будь, что будет.
          </p>
        </div>
      </div>
      <div className={styles.profileDetails__containerBlogs}>
        <Blogs />
      </div>
    </section>
  );
}
