import React, { FC } from 'react';
import MainPageStyles from './MainPage.module.css';
import { Outlet } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

export const MainPage: FC = () => {
  return (
    <>
      <Header />
      <h1>
        Главная страница
        <Outlet />
      </h1>
      <Footer />
    </>
  );
}
