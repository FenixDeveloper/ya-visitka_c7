import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import styles from './RootPage.module.scss';

export const RootPage: FC = () => {
  return (
    <section className={styles.container}>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </section>
  );
};
