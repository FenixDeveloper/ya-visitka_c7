import React, { FC } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from '../../router/router';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { testUser } from '../../utils/constants';

const App: FC = () => {
  return (
    <>
      <Header user={testUser} />
      <main>
        <RouterProvider router={router} />
      </main>
      <Footer />
    </>
  );
};

export default App;
