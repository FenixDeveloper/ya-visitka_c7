import React, { FC } from 'react';
import { RouterProvider } from 'react-router-dom';
import { EXAMPLE_CURRENT_USER } from '../../utils/constants';
import { router } from '../../router/router';
import { ProfileContext } from '../../services/profileContext';

const App: FC = () => {
  const [profileState, setProfileState] = React.useState({
    user: EXAMPLE_CURRENT_USER,
    pattern: 'серьезный',
    birthday: new Date(1990, 0, 7),
    fileHobby: '',
    fileHome: '',
    city: 'Петровск (Саратовская область)',
    formBirthday: new Date(1990, 0, 7),
    formPattern: 'серьезный',
    formFileHobby: '',
    formFileHome: '',
    formSity: 'Петровск (Саратовская область)'
  });

  return (
    <ProfileContext.Provider value={[profileState, setProfileState]}>
      <RouterProvider router={router} />
    </ProfileContext.Provider>
  );
};

export default App;
