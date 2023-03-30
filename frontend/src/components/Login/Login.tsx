import React, { FC } from "react";
import defaulAvatar from "../../assets/icons/defaultAvatar.svg";
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
            <img src={defaulAvatar} alt="default-avatar" />
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
