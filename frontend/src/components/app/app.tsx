import React, { FC, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { EXAMPLE_CURRENT_USER } from '../../utils/constants';
import { router } from '../../router/router';
import { ProfileContext } from '../../services/profile-context';
import { api } from '../../utils/api-config';

const App: FC = () => {
  const [profileState, setProfileState] = React.useState({
    user: EXAMPLE_CURRENT_USER,
    avatar: 'https://s16.stc.yc.kpcdn.net/share/i/12/12640462/wr-960.webp',
    pattern: 'серьезный',
    birthday: new Date(1990, 0, 7),
    city: 'Петровск (Саратовская область)',
    telegram: 'devhumor_tg',
    github: 'FenixDeveloper',
    quote: '',
    fileHobby: null,
    hobby: '',
    fileHome: null,
    relationship: '',
    bio: '',
    reason: '',
    formBirthday: new Date(1990, 0, 7),
    formPattern: 'серьезный',
    formFileHobby: null,
    formFileHome: null,
    formCity: 'Петровск (Саратовская область)',
    formAvatar: 'https://s16.stc.yc.kpcdn.net/share/i/12/12640462/wr-960.webp',
    cityMain: 'Петровск (Саратовская область)',
  });

  useEffect(() => {
    if (api.accessToken) {
      api.getUserAuth().then((user) => {
        setProfileState({ ...profileState, user });
      });
    }
  }, []);

  return (
    <ProfileContext.Provider value={[profileState, setProfileState]}>
      <RouterProvider router={router} />
    </ProfileContext.Provider>
  );
};

export default App;
