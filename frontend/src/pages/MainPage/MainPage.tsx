import React, { FC } from 'react';
import { Visitka } from '../../components/Visitka/Visitka';

import MainPageStyles from './MainPage.module.css';

export const MainPage: FC = () => {
  return (
    <>
      <h1>Главная страницаы</h1>
      <Visitka
        id={'123'}
        name={'Renat'}
        photo={'https://i.pravatar.cc/300'}
        city={'Kazan'}
      />
    </>
  );
};
