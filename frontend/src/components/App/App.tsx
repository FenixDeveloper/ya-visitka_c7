import React, { FC } from 'react';
import { RouterProvider } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { testUser } from '../../utils/constants';
import { router } from '../../router/router';

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
