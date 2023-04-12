import { FC } from 'react';
import { renderToString } from 'react-dom/server';
import { YMaps, Map, Placemark, ZoomControl, } from '@pbe/react-yandex-maps';
import { Balloon } from '../Balloon/Balloon';
import MapIcon from '../../assets/icons/map-icon.svg';

import styles from './YandexMap.module.scss';

type Student = {
  id: number;
  name: string;
  city: string;
  location: [number, number];
  preview: string;
};

type YandexMapProps = {
  center?: [number, number];
  zoom?: number;
  students: Student[];
};

export const YandexMap: FC<YandexMapProps> = ({ center = [55.753215, 37.622504], zoom = 10, students }) => {

  return (
    <YMaps>
      <Map defaultState={{ center, zoom }} className={styles.mapContainer} >
        <ZoomControl options={{ position: { top: 200, right: 10 } }} />
        {students.map((student) => (
          <Placemark
            key={student.id}
            geometry={student.location}
            options={{
              iconLayout: 'default#image',
              iconImageSize: [60, 68],
              iconImageOffset: [-24, -24],
              iconContentOffset: [15, 15],
              iconImageHref: MapIcon,
              hideIconOnBalloonOpen: false,
              balloonOffset: [88, 46]
            }}
            modules={['geoObject.addon.balloon']}
            properties={{ balloonContent: renderToString(<Balloon name={student.name} city={student.city} preview={student.preview} />) }}
          />))}
      </Map>
    </YMaps>
  );
};
