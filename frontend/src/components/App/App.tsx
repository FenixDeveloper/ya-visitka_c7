import React, { FC } from 'react';
import { RouterProvider } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { EXAMPLE_CURRENT_USER } from '../../utils/constants';
import { router } from '../../router/router';

const App: FC = () => {
  return (
    <>
      <Header user={EXAMPLE_CURRENT_USER} />
      <main>
        <RouterProvider router={router} />
      </main>
      <Footer />
    </>
  );
};

export default App;
