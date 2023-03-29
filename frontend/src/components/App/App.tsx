import React, { FC } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from '../../router/router';
import Footer from '../Footer/Footer';

const App: FC = () => {
  return (
    <>
      <RouterProvider router={router} />
      <Footer />
    </>
  );
}

export default App;
