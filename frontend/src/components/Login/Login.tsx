import React, { FC } from "react";
import defaulAvatar from "../../assets/icons/default-avatar.svg";
import styles from "./Login.module.scss";
import { NavLink } from "react-router-dom";

interface User {
  user: {
    name: string;
    avatar?: string;
  };
}

const Login: FC<User> = ({ user }) => {
  const [active, setActive] = React.useState<boolean>(false);
  const closePopupStyle = !active ? styles.popup_open_closed : "";

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
    <div className={styles.container}>
      <div className={`${styles.popup} ${closePopupStyle}`}>
        <div className={styles.popup__wrapper}>
          <div className={styles.login} onClick={() => setActive(!active)}>
            <img
              className={styles.login__image}
              src={user?.avatar || defaulAvatar}
              alt={`аватар-${user.name}`}
            />
            <p className={styles.login__text}>{user.name}</p>
          </div>
          {active && (
            <ul className={styles.links}>
              <li className={styles.link}>
                <NavLink to="#1" className={styles.link__item}>
                  Профиль
                </NavLink>
              </li>
              <li className={styles.link}>
                <button type="button" className={styles.link__item}>
                  Выйти
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
export default Login;
