/* eslint-disable react/react-in-jsx-scope */
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Input } from '../../components/input/input';
import { Visitka } from '../../components/visitka/visitka';
import { EXAMPLE_DEFAUT_ARR, EXAMPLE_VISITKAS } from '../../utils/constants';
import Preloader from '../../components/preloader/preloader';
import styles from './main-page.module.scss';

export const MainPage: React.FC = () => {
  const [visitka, setVisitka] = useState(EXAMPLE_VISITKAS[0]);
  const selectedCity = visitka.city;
  // const [data, setData] = useState([]);
  const [filteredVisitkas, setFilteredVisitkas] = useState(EXAMPLE_VISITKAS);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    // axios.get('/users');
    // setData
    if (selectedCity) {
      setTimeout(() => {
        setFilteredVisitkas(EXAMPLE_VISITKAS.filter((item) => item.city === selectedCity));
        setLoading(false);
      }, 1000);
    }
  }, [selectedCity, visitka]);

  const handleCityChange = (e: any): void => {
    console.log('events', e);
    setVisitka((prevState: any) => ({ ...prevState, city: e.target.value }));
  };

  return loading ? (
    <Preloader />
  ) : (
    <section className={styles.wrapper}>
      <nav className={styles.navigation}>
        <div className={styles.select}>
          {/* <input
            type="select"
            // arrValues={EXAMPLE_DEFAUT_ARR}
            value={selectedCity}
            onChange={handleCityChange}
          /> */}
          <select onChange={handleCityChange}>
            {EXAMPLE_DEFAUT_ARR.map((item, i) => (
              <option key={i}>{item}</option>
            ))}
          </select>
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
