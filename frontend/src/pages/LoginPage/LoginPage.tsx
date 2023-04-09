import { FC, useEffect, useState } from "react";
import { Button } from "../../components/Button/Button";
import LoginPageStyles from './LoginPage.module.scss';

export const LoginPage: FC = () => {

    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
    const [errorActive, setErrorActive] = useState<boolean>(false);

    useEffect(() => {
      function updateWindowWidth() {
        setWindowWidth(window.innerWidth)
      };

      window.addEventListener('resize', updateWindowWidth);

      return () => window.removeEventListener('resize', updateWindowWidth);
    }, [windowWidth])

    return (
      <section className={LoginPageStyles.loginPage}>
        <h1 className={LoginPageStyles.loginPage__title}>
            С кем я учусь?
        </h1>
        <a className={LoginPageStyles.loginPage__buttonBox}
          href='https://oauth.yandex.ru/authorize?response_type=code & client_id=<6588f39ea0274d599d3c60fb10c53556>'
        >
          <Button size={windowWidth <= 576 ? 'medium' : 'large'} 
            htmlType='button'
          >
            <p className={LoginPageStyles.loginPage__buttonText}>
              Войти с Яндекс ID
            </p>
          </Button>
          <p className={`${LoginPageStyles.loginPage__errorText} ${errorActive && LoginPageStyles.loginPage__errorText_active}`}>
            что-то пошло не так, попробуйте еще раз
          </p>
        </a>
      </section>
    );
  }
