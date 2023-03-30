import React, { FC } from "react";
import styles from "./Login.module.scss";

interface User {
  user: {
    name: string;
    avatar?: string;
  };
}

const Login: FC<User> = ({ user }) => {
  const [active, setActive] = React.useState<boolean>(false);

  const handlerClickPopup = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setActive(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("keydown", handlerClickPopup);

    return () => document.removeEventListener("keydown", handlerClickPopup);
  }, []);

  return (
    <div
      className={`${styles.container} ${!active && styles.container__closed}`}
    >
      <div className={styles.container__popup}>
        <div className={styles.login} onClick={() => setActive(!active)}>
          {user.avatar ? (
            <img
              className={styles.login__image}
              src={user.avatar}
              alt="Аватарка"
            />
          ) : (
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="16"
                cy="16"
                r="16"
                fill="#100C34"
                fill-opacity="0.15"
              />
            </svg>
          )}

          <p className={styles.login__text}>{user.name}</p>
        </div>
        {active && (
          <ul className={styles.links}>
            <li className={styles.link}>
              <a href="#1" className={styles.link__item}>
                Профиль
              </a>
            </li>
            <li className={styles.link}>
              <a href="#1" className={styles.link__item}>
                Выйти
              </a>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};
export default Login;
