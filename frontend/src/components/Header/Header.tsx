import React, { FC } from 'react';
import Login from '../Login/Login';
import styles from './Header.module.scss';
import logo from '../../assets/icons/title-logo.svg';
import { ProfileContext } from '../../services/profileContext';

const Header: FC = () => {
  const [profileState, setProfileState] = React.useContext(ProfileContext);

  return (
    <header className={styles.container}>
      <img className={styles.container__title} src={logo} alt='VISITKI-logo' />
      {profileState.user?.name && <Login user={profileState.user} />}
    </header>
  );
};

export default Header;
