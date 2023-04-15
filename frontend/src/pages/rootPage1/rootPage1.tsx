import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../components/header1/header1';
import Footer from '../../components/footer1/footer1';
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
