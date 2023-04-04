import React, { FC } from 'react';
import styles from './App.module.scss';
import { RouterProvider } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { EXAMPLE_CURRENT_USER } from '../../utils/constants';
import { router } from '../../router/router';

const App: FC = () => {
  return (
    <section className={styles.app}>
      <Header user={EXAMPLE_CURRENT_USER} />
      <main>
        <RouterProvider router={router} />
      </main>
      <Footer />
    </section>
  );
};

export default App;
