import React, { FC } from 'react';
import Login from '../Login/Login';
import styles from './Header.module.scss';
import logo from '../../assets/icons/title-logo.svg';
import { ProfileContext } from '../../services/profileContext';

const Header: FC = () => {
  const { user } = React.useContext(ProfileContext);

  return (
    <header className={styles.container}>
      <img className={styles.container__title} src={logo} alt='VISITKI-logo' />
      {user?.name && <Login user={user} />}
    </header>
  );
};

export default Header;
