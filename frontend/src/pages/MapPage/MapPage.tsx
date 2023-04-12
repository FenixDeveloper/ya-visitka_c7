import React, { FC } from 'react';
import { YandexMap } from '../../components/YandexMap/YandexMap';
import styles from './MapPage.module.css';

const students = [
  {
    id: 1,
    name: 'Иван Иванов',
    location: [55.751574, 37.573856] as [number, number],
    preview: 'https://i.imgur.com/d5hoGF1.jpg',
    city: 'Ашхабад'
  },
  {
    id: 2,
    name: 'Петр Петров',
    location: [55.747022, 37.656998] as [number, number],
    preview: 'https://i.imgur.com/agWkAK6.jpg',
    city: 'Берабиджан'
  },
];

export const MapPage: FC = () => {
  return (
    <div className={styles.app}>
      <YandexMap students={students} />
    </div>
  );
};
