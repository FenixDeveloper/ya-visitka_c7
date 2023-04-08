import React, { FC, useState } from 'react';
import styles from './App.module.scss';
import { RouterProvider } from 'react-router-dom';
import { EXAMPLE_CURRENT_USER } from '../../utils/constants';
import { router } from '../../router/router';
import { ProfileContext } from '../../services/profileContext';

const App: FC = () => {
  const [profileState, setProfileState] = useState({
    select: 'Петровск (Саратовская область)',
    date: new Date(1990, 0, 7),
    file: '',
    user: EXAMPLE_CURRENT_USER,
  });

  return (
    <ProfileContext.Provider value={[profileState, setProfileState]}>
      <section className={styles.app}>
        <Header />
        <main>
          <RouterProvider router={router} />
        </main>
        <Footer />
      </section>
    <RouterProvider router={router} />
  );
};

export default App;
