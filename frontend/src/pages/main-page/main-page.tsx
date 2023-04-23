/* eslint-disable react/react-in-jsx-scope */
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Input } from '../../components/input/input';
import { Visitka } from '../../components/visitka/visitka';
import { EXAMPLE_DEFAUT_ARR, EXAMPLE_VISITKAS } from '../../utils/constants';
import Preloader from '../../components/preloader/preloader';
import styles from './main-page.module.scss';
import { ProfileContext } from '../../services/profile-context';
import { useGetAccessTokenByQueryCode } from './hooks';
import { api } from '../../utils/api-config';
import { TVisitka } from '../../services/types/data';

export const MainPage: React.FC = () => {
  useGetAccessTokenByQueryCode()

  const [profileState] = React.useContext(ProfileContext);
  const [filteredVisitkas, setFilteredVisitkas] = useState<TVisitka[]>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchVisitkas = async () => {
      await api.getProfile(0, 20, profileState.user.cohort)
        .then((res) => setFilteredVisitkas(res))
    }
    fetchVisitkas();
  }, []);

  React.useEffect(() => {
    if (profileState.cityMain) {
      setTimeout(() => {
        if (filteredVisitkas) {
          setFilteredVisitkas(filteredVisitkas.filter((item) => {
            if (item.profile) {
              if (item.profile.city) {
                item.profile.city.name.toLowerCase() === profileState.cityMain.toLowerCase()
              } else {
                return true
              }
            }
          }
          ));
          setLoading(false);
        }
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
        {filteredVisitkas && filteredVisitkas.map((item) => {
          if (item.profile) { 
            return(
              <Visitka 
                key={item._id} 
                _id={item._id} 
                photo={item.profile.photo}
                city={item.profile?.city?.name}
                name={item.profile.name} 
              />)}
        })}
      </div>
    </section>
  );
};
