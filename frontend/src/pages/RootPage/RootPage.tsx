import React, { FC } from 'react';
import RootPageStyles from './MainPage.module.css';
import { Outlet } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

export const RootPage: FC = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
