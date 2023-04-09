import React, { FC } from 'react';
import { YandexMap } from '../../components/YandexMap/YandexMap';
import styles from './MapPage.module.css';

const students = [
  {
    id: 1,
    name: 'Иван Иванов',
    location: [55.751574, 37.573856] as [number, number],
    preview: 'https://i.imgur.com/d5hoGF1.jpg',
  },
  {
    id: 2,
    name: 'Петр Петров',
    location: [55.747022, 37.656998] as [number, number],
    preview: 'https://i.imgur.com/agWkAK6.jpg',
  },
];

export const MapPage: FC = () => {
  return (
    <div  className={styles.app}>
      <YandexMap students={students} />
    </div>
  );
};

// временная заглушка App
// import React, { FC, useState } from 'react';
// import styles from './App.module.scss';
// import { RouterProvider } from 'react-router-dom';
// import { EXAMPLE_CURRENT_USER } from '../../utils/constants';
// import { router } from '../../router/router';
// import { ProfileContext } from '../../services/profileContext';
// import Header from '../Header/Header';
// import Footer from '../Footer/Footer';


// const App: FC = () => {
//   const [profileState, setProfileState] = useState({
//     select: 'Петровск (Саратовская область)',
//     date: new Date(1990, 0, 7),
//     file: '',
//     user: EXAMPLE_CURRENT_USER,
//   });

//   return (
//     <ProfileContext.Provider value={[profileState, setProfileState]}>
//       <section >
//         <Header />
//         <main>
//           <RouterProvider router={router} />
//         </main>
//         <Footer />
//       </section>
//     </ProfileContext.Provider>
//   );
// };

// export default App;
