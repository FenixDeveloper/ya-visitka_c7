/* eslint-disable react/react-in-jsx-scope */
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Input } from '../../components/input/input';
import { Visitka } from '../../components/visitka/visitka';
import { EXAMPLE_DEFAUT_ARR, EXAMPLE_VISITKAS } from '../../utils/constants';
import Preloader from '../../components/preloader/preloader';
import styles from './main-page.module.scss';
import { ProfileContext } from '../../services/profile-context';
import { useGetAccessTokenByQueryCode } from './hooks';
import { log } from 'console';

export const MainPage: React.FC = () => {
  useGetAccessTokenByQueryCode()

  const [profileState] = React.useContext(ProfileContext);
  // const [data, setData] = useState([]);
  const [filteredVisitkas, setFilteredVisitkas] = useState(EXAMPLE_VISITKAS);
  const [loading, setLoading] = useState(true);


  React.useEffect(() => {
    // axios.get('/users');
    // setData 
    if (profileState.cityMain) {
      setTimeout(() => {
        setFilteredVisitkas(EXAMPLE_VISITKAS.filter((item) => item.city.toLowerCase() === profileState.cityMain.toLowerCase()));
        setLoading(false);
      }, 1000);
    }
  }, [profileState.cityMain]);


  return loading ? (
    <Preloader />
  ) : (
    <section className={styles.wrapper}>
      <nav className={styles.navigation}>
        <div className={styles.select}>
          <Input
            type="select"
            arrValues={EXAMPLE_DEFAUT_ARR}
            value={profileState.cityMain}
            isMainPage
          />
        </div>
        <NavLink className={styles.map} to="/map">
          Посмотреть на карте
        </NavLink>
      </nav>
      <div className={styles.container}>
        {filteredVisitkas.map((item) => (
          <Visitka key={item.id} {...item} />
        ))}
      </div>
    </section>
  );
};
