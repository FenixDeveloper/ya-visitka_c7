import React, { FC } from 'react';
import Login from '../Login/Login';
import styles from './Header.module.scss';
import logo from '../../assets/icons/title-logo.svg';
import { UserData } from '../../services/types/data';

const Header: FC<UserData> = ({ user }) => {
  return (
    <header className={styles.container}>
      <img className={styles.container__title} src={logo} alt="VISITKI-logo" />
      <Login user={user} />
    </header>
  );
};

export default Header;
