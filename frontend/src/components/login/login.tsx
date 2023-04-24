import React, { FC, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import defaulAvatar from '../../assets/icons/default-avatar.svg';
import styles from './login.module.scss';
import { ProfileContext } from '../../services/profile-context';

const Login: FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [active, setActive] = React.useState<boolean>(false);
  const closePopupStyle = !active ? styles.popup_open_closed : '';

  const [profileState, _] = React.useContext(ProfileContext);
  const { user } = profileState;

  const handleClickOutside = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setActive(false);
    }
  }

  const logout = () => {
    localStorage.clear();
    navigate('/login');
    setActive(false);
  }

  const handlerClickPopup = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setActive(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    setActive(false);
  };

  React.useEffect(() => {
    document.addEventListener('keydown', handlerClickPopup);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handlerClickPopup);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <article className={styles.container}>
      <div className={`${styles.popup} ${closePopupStyle}`}>
        <div className={styles.popup__wrapper} ref={ref}>
          <div className={styles.login} onClick={() => setActive(!active)}>
            <img
              className={styles.login__image}
              src={user?.photo || defaulAvatar}
              alt={`аватар-${user.name}`}
            />
            <p className={styles.login__text}>{user.name}</p>
          </div>
          {active && (
            <div className={styles.links}>
              <NavLink
                to={`/profiles/${user._id}`}
                className={styles.link}
                onClick={() => setActive(false)}
              >
                Профиль
              </NavLink>
              <button
                type='button'
                className={styles.btn}
                onClick={handleLogout}
              >
                Выйти
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default Login;
