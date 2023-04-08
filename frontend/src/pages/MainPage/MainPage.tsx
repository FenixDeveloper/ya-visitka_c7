import React, { FC } from 'react';
import MainPageStyles from './MainPage.module.css';
import { Visitka } from '../../components/Visitka/Visitka';

export const MainPage: FC = () => {
  return (
    <>
      <h1>
        Главная страница
        <Visitka id={'123'} name={'Renat'} photo={'https://i.pravatar.cc/300'} city={'Kazan'}></Visitka>
        <Visitka id={'123'} name={'Renat'} photo={'https://i.pravatar.cc/300'} city={'Kazan'}></Visitka>
        <Visitka id={'123'} name={'Renat'} photo={'https://i.pravatar.cc/300'} city={'Kazan'}></Visitka>
        <Visitka id={'123'} name={'Renat'} photo={'https://i.pravatar.cc/300'} city={'Kazan'}></Visitka>
        <Visitka id={'123'} name={'Renat'} photo={'https://i.pravatar.cc/300'} city={'Kazan'}></Visitka>
        <Visitka id={'123'} name={'Renat'} photo={'https://i.pravatar.cc/300'} city={'Kazan'}></Visitka>
        <Visitka id={'123'} name={'Renat'} photo={'https://i.pravatar.cc/300'} city={'Kazan'}></Visitka>
        <Visitka id={'123'} name={'Renat'} photo={'https://i.pravatar.cc/300'} city={'Kazan'}></Visitka>
        <Visitka id={'123'} name={'Renat'} photo={'https://i.pravatar.cc/300'} city={'Kazan'}></Visitka>
        <Visitka id={'123'} name={'Renat'} photo={'https://i.pravatar.cc/300'} city={'Kazan'}></Visitka>
        <Visitka id={'123'} name={'Renat'} photo={'https://i.pravatar.cc/300'} city={'Kazan'}></Visitka>
        <Visitka id={'123'} name={'Renat'} photo={'https://i.pravatar.cc/300'} city={'Kazan'}></Visitka>
      </h1>
    </>
  );
}
