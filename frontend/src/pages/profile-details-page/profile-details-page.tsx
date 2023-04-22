import React, { FC } from 'react';
import styles from './profile-details-page.module.scss';
import { ProfileContext } from '../../services/profile-context';
import telegramIcon from '../../assets/icons/telegram.svg';
import githubIcon from '../../assets/icons/github.svg'
import { Blogs } from '../../components/blogs/blogs';
import { Communication } from '../../components/communication/communication';

export const ProfileDetailsPage: FC = () => {
  const [profileState, _] = React.useContext(ProfileContext);

  return (
    <section className={styles.profileDetails}>
      <div className={styles.profileDetails__container}>
        <div className={styles.profileDetails__infoBox}>
          <h1 className={styles.profileDetails__title}>{profileState.user.name}</h1>
          <p className={styles.profileDetails__text}>Калуга</p>
          <div className={styles.profileDetails__iconBox}>
            {profileState.telegram && <a className={styles.profileDetails__iconLink} href={`https://www.t.me/${profileState.telegram}`}>
              <div className={styles.profileDetails__icon} style={{ backgroundImage: `url(${telegramIcon})`}}>
              </div>
            </a>}
            {profileState.github && <a className={styles.profileDetails__iconLink} href={`https://github.com/${profileState.github}`}>
              <div className={styles.profileDetails__icon} style={{ backgroundImage: `url(${githubIcon})`}}>
              </div>
            </a>}
          </div>
        </div>
        <div className={styles.profileDetails__avatarBox}>
          <img className={
            `${styles.profileDetails__avatar}
             ${profileState.pattern === 'романтичный' && styles.profileDetails__avatar_romantic}`
          }
          src={`${profileState.user.photo}`}
          alt={`Аватар пользователя ${profileState.user.name}`}
          />
          <div className={`${profileState.pattern === 'дерзкий' && styles.profileDetails__maskAvatar}`}></div>
        </div>
        <div className={styles.profileDetails__decriptionBox}>
          <div className={styles.profileDetails__communicationBox}>
            <Communication arrСomments={[]} />
          </div>
          <div className={styles.profileDetails__quotesBox}>
            <div className={`${styles.profileDetails__quotesIcon} ${profileState.pattern !== 'серьезный' && styles.profileDetails__quotesIcon_pink}`}></div>
            <div className={`${styles.profileDetails__quotesIcon} ${profileState.pattern  !== 'серьезный' && styles.profileDetails__quotesIcon_pink}`}></div>
          </div>
          <p className={`${styles.profileDetails__descriptionText} ${profileState.pattern  !== 'серьезный' && styles.profileDetails__descriptionText_notDefault}`}>
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
