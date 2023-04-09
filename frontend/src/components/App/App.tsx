import React, { FC, useState } from 'react';
import styles from './App.module.scss';
import { RouterProvider } from 'react-router-dom';
import { EXAMPLE_CURRENT_USER } from '../../utils/constants';
import { router } from '../../router/router';
import { ProfileContext } from '../../services/profileContext';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const App: FC = () => {
  const [profileState, setProfileState] = React.useState({
    user: EXAMPLE_CURRENT_USER,
    avatar: 'https://s16.stc.yc.kpcdn.net/share/i/12/12640462/wr-960.webp',
    pattern: 'серьезный',
    birthday: new Date(1990, 0, 7),
    city: 'Петровск (Саратовская область)',
    telegram: '', 
    github: '',
    quote: '', 
    fileHobby: '',
    hobby: '', 
    fileHome: '',
    relationship: '', 
    bio: '', 
    reason: '',
    formBirthday: new Date(1990, 0, 7),
    formPattern: 'серьезный',
    formFileHobby: '',
    formFileHome: '',
    formSity: 'Петровск (Саратовская область)',
    formAvatar: 'https://s16.stc.yc.kpcdn.net/share/i/12/12640462/wr-960.webp'
  });

  return (
    <ProfileContext.Provider value={[profileState, setProfileState]}>
      
      <RouterProvider router={router} />
      
    </ProfileContext.Provider>
  );
};

export default App;
