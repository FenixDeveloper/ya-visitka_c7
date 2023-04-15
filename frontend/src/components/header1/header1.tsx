import React, { FC } from 'react';
import Login from '../login1/login1';
import styles from './Header.module.scss';
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
