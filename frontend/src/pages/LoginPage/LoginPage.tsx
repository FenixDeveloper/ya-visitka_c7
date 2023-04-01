import { FC, useEffect, useState } from "react";
import { Button } from "../../components/Button/Button";
import LoginPageStyles from './LoginPage.module.scss';

export const LoginPage: FC = () => {

    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

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
        <div className={LoginPageStyles.loginPage__buttonBox}>
          <Button size={windowWidth <= 576 ? 'medium' : 'large'} htmlType='button' onClick={() => {}}>
            <p className={LoginPageStyles.loginPage__buttonText}>Войти с Яндекс ID</p>
          </Button>
        </div>
      </section>
    );
  }
