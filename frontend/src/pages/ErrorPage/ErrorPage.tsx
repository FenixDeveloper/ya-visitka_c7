import { FC } from "react";
import { useRouteError } from "react-router-dom";
import ErrorPageStyles from './ErrorPage.module.css';

export const ErrorPage: FC = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Ошибка</h1>
      <p>Произошла ошибка</p>
    </div>
  );
}
