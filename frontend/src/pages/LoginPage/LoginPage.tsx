import React, { FC, useEffect, useState } from 'react';
import { Button } from '../../components/Button/Button';
import LoginPageStyles from './LoginPage.module.scss';
import { CLIENT_ID } from '../../utils/constants';

interface IProps {
  redirectUri: string
}

export const LoginPage: FC<IProps> = ({ redirectUri }) => {

  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [errorActive, setErrorActive] = useState<boolean>(false);

  useEffect(() => {
    function updateWindowWidth() {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', updateWindowWidth);

    return () => window.removeEventListener('resize', updateWindowWidth);
  }, [windowWidth])

  return (
    <section className={LoginPageStyles.loginPage}>
      <h1 className={LoginPageStyles.loginPage__title}>
            С кем я учусь?
      </h1>
      <a className={LoginPageStyles.loginPage__buttonBox}
        href={`https://oauth.yandex.ru/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${redirectUri}`}
      >
        <Button size={windowWidth <= 576 ? 'medium' : 'large'} 
          htmlType='button'
        >
          <p className={LoginPageStyles.loginPage__buttonText}>
              Войти с Яндекс ID
          </p>
        </Button>
      </a>
      <p className={`${LoginPageStyles.loginPage__errorText} ${errorActive && LoginPageStyles.loginPage__errorText_active}`}>
          ЧТО-ТО ПОШЛО НЕ ТАК, ПОПРОБУЙТЕ ЕЩЕ РАЗ
      </p>
    </section>
  );
}
