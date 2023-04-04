import React, { FC } from 'react';
import styles from './App.module.scss';
import { RouterProvider } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { EXAMPLE_CURRENT_USER } from '../../utils/constants';
import { router } from '../../router/router';
import { ProfileContext } from '../../services/profileContext';

const App: FC = () => {
  const profileState = {
    select: 'Петровск (Саратовская область)',
    date: new Date(1990, 0, 7),
    file: '',
    user: EXAMPLE_CURRENT_USER,
  };

  return (
    <ProfileContext.Provider value={profileState}>
      <section className={styles.app}>
     
        <main>
          <RouterProvider router={router} />
        </main>
       
      </section>
    </ProfileContext.Provider>
  );
};

export default App;
