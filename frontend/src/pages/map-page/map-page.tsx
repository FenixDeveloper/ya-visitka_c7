import { FC } from 'react';
import { YandexMap } from '../../components/yandex-map/yandex-map';

const mockStudents = [
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

type MapPageProps = {
  students?: typeof mockStudents;
};

export const MapPage: FC<MapPageProps> = ({ students = mockStudents }) => <YandexMap students={students} />;
