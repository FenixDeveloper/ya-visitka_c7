import React, { FC } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from '../../router/router';
import AppStyles from './App.module.css';
import Footer from '../Footer/Footer';

const App: FC = () => {
  return (
    <>
      <header>Хедер</header>
      <main>
        <RouterProvider router={router} />

      </main>
      <Footer />
    </>
  );
}

export default App;
