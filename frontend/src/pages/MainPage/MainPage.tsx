import { FC } from "react";
import { Button } from "../../components/Button/Button";
import MainPageStyles from './MainPage.module.css';

export const MainPage: FC = () => {
    return (
      <>
        <h1>
            Главная страница
            <Button disabled onClick={() => console.log('нажалась кнопка')}>Text</Button>
        </h1>
      </>
    );
  }
