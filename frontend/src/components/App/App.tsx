import React, { FC } from 'react';
import { RouterProvider } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { EXAMPLE_CURRENT_USER } from '../../utils/constants';
import { router } from '../../router/router';
import { ProfileContext } from '../../services/profileContext';


const App: FC = () => {
  const profileState = React.useState({ select: 'Петровск (Саратовская область)', date: new Date(1990, 0, 7), file: '' });

  return (
    <>
      <Header user={EXAMPLE_CURRENT_USER} />
      <main>
        <ProfileContext.Provider value={profileState}>
          <RouterProvider router={router} />
        </ProfileContext.Provider>
      </main>
      <Footer />
    </>
  );
};

export default App;
