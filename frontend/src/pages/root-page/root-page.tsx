import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import styles from './root-page.module.scss';

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
