import React, { FC } from 'react';
import { RouterProvider } from 'react-router-dom';
import { EXAMPLE_CURRENT_USER } from '../../utils/constants';
import { router } from '../../router/router';
import { ProfileContext } from '../../services/profileContext';

const App: FC = () => {
  const profileState = {
    select: 'Петровск (Саратовская область)',
    date: new Date(1990, 0, 7),
    file: '',
    user: EXAMPLE_CURRENT_USER,
  };

  return (
    <ProfileContext.Provider value={profileState}>
      <RouterProvider router={router} />
    </ProfileContext.Provider>
  );
};

export default App;
