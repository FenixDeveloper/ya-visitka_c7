/* eslint-disable */
import React, { FC, } from 'react';
import {
  YMaps, Map, Placemark, ZoomControl, SearchControl, TrafficControl, RulerControl,
  GeolocationControl, FullscreenControl, RoutePanel, TypeSelector, RouteButton, RouteEditor
} from '@pbe/react-yandex-maps';

import MapIcon from '../../assets/icons/map1.svg';


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
        height="calc(100vh - 184px)"
        options={{ minZoom: 0, maxZoom: 19 }} // Ограничение зум, можно ли ограничить выползания за карту?
      >
        <RouteButton options={{ float: 'right' }} />
        <TypeSelector />
        {/* <RoutePanel /> */}
        <RouteEditor />
        <ZoomControl className="custom-zoom-control" options={{ position: { top: 200, right: 10 } }} />

        <FullscreenControl />
        <TrafficControl />
        <RulerControl />
        <GeolocationControl />
        <SearchControl options={{ float: "left" }} />

        {students.map((student) => (
          <Placemark
            key={student.id}
            instanceRef={e => {
              e?.balloon?.open();
            }}

            geometry={student.location}
            options={{
              iconLayout: 'default#image',
              iconImageSize: [48, 48],
              iconImageOffset: [-24, -24],
              iconContentOffset: [15, 15],
              iconImageHref: MapIcon,
              hideIconOnBalloonOpen: false,
              balloonOffset: [80, 40],

            }}
            modules={["geoObject.addon.balloon"]}
            properties={{
              balloonContent: `
           <div style='display: flex;'>
             <img style='border-radius:100%;' src='${student.preview}' width='50'/>
             <div>
               <p>${student.name}</p>
             </div>
           </div>
         `
            }}
          />
        ))}
      </Map>
    </YMaps>
  );
};


// .ymaps-2-1-79-balloon__tail {
//   visibility: hidden;
// }

// .ymaps-2-1-79-zoom__scale {
//   visibility: hidden;
// }

// .ymaps-2-1-79-zoom__plus {
//   margin-left: -5px;
//   margin-top: 130px;
//   scale: 1.5;
// }

// .ymaps-2-1-79-zoom__minus {
//   margin-left: -5px;
//   scale: 1.5;
// }
