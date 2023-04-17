import React, { FC } from 'react';
import Login from '../login/login';
import styles from './header.module.scss';
import logo from '../../assets/icons/title-logo.svg';

const Header: FC = () => {
  return (
    <header className={styles.container}>
      <img className={styles.container__title} src={logo} alt='VISITKI-logo' />
      <Login />
    </header>
  );
};

export default Header;
