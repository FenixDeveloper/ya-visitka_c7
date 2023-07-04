import React, { FC } from 'react';
import Login from '../login/login';
import styles from './header.module.scss';
import logo from '../../assets/icons/title-logo.svg';
import { NavLink } from 'react-router-dom';

const Header: FC = () => {
  return (
    <header className={styles.container}>
      <NavLink to={'/'} className={styles.container__title}>
        <img src={logo} alt='VISITKI-logo' />
      </NavLink>
      <Login />
    </header>
  );
};

export default Header;
