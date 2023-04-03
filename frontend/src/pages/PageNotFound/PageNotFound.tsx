import React, { FC } from 'react';
import { useRouteError } from 'react-router-dom';
import PageNotFoundStyles from './PageNotFound.module.css';

export const PageNotFound: FC = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Ошибка</h1>
      <p>Произошла ошибка</p>
    </div>
  );
}
