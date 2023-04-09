import React, { FC } from 'react';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';

type Student = {
  id: number;
  name: string;
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
      <Map
        defaultState={{ center, zoom }}
        width="100vw"
        height="80vh"
        options={{ minZoom: 0, maxZoom: 19 }} // Ограничение зум, можно ли ограничить выползания за карту?
      >
        {students.map((student) => (
          <Placemark
            key={student.id}
            geometry={student.location}
            properties={{
              balloonContentHeader: student.name,
              balloonContentBody: `<img src="${student.preview}" alt="${student.name}" width="100px" />`,
            }}
          />
        ))}
      </Map>
    </YMaps>
  );
};
